const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const RatingAndReview =require("../models/RatingAndReview");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Category = require("../models/Category");
const CourseProgress = require("../models/CourseProgress");
// Method for updating a profile
exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber="",firstName,lastName,gender="" } = req.body;
		const id = req.user.id;
		
		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		// Update the profile fields
		userDetails.firstName = firstName || userDetails.firstName;
		userDetails.lastName = lastName || userDetails.lastName;
		profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
		profile.about = about || profile.about;
		profile.gender=gender || profile.gender;
		profile.contactNumber = contactNumber || profile.contactNumber;

		// Save the updated profile
		await profile.save();
		await userDetails.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
			userDetails
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	try {
		const id = req.user.id;
		console.log("user_id",id);
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		
		if(user.accountType==="Student"){
			const enrolledCourses = user.courses;
				for(const cs of enrolledCourses){
					await Course.findByIdAndUpdate({_id : cs},{
						$pull : {studentsEnrolled : id},
					})
					await CourseProgress.findOneAndDelete({courseID:cs},{userID:id})

					const rat =await RatingAndReview.findOne({user:id,
						course:cs})
						await Course.findByIdAndUpdate({_id : cs},{
							$pull : {ratingAndReviews : rat._id},
						})
						await RatingAndReview.findByIdAndDelete({_id:rat._id})
				}
		}

		if(user.accountType==="Instructor"){
			const courses = user.courses;
			for(const courseId of courses){
				try {
					  
					  // Find the course
					  const course = await Course.findById(courseId)
					  
					  if (!course) {
						return res.status(404).json({ message: "Course not found" })
					  }
					  const rat = course.ratingAndReviews
					  for(const r of rat){
						await RatingAndReview.findByIdAndDelete({_id:r})
					  }
					  await CourseProgress.findOneAndDelete({courseID:courseId},{userID:id})
					  // Unenroll students from the course
					  const studentsEnrolled = course.studentsEnrolled
					  for (const studentId of studentsEnrolled) {
						await User.findByIdAndUpdate({_id : studentId}, {
						  $pull: { courses: courseId },
						})
					  }
				  
					  // Delete sections and sub-sections
					  const courseSections = course.courseContent
					  for (const sectionId of courseSections) {
						// Delete sub-sections of the section
						const section = await Section.findById({_id : sectionId})
						if (section) {
						  const subSections = section.subSection
						  for (const subSectionId of subSections) {
							await SubSection.findByIdAndDelete({_id:subSectionId});
						  }
						}
				  
						// Delete the section
						await Section.findByIdAndDelete({_id:sectionId})
					  }
				  
					  // Delete the course
					  await Course.findByIdAndDelete({_id:courseId})
				
					  //Delete course id from Category
					  await Category.findByIdAndUpdate({_id : course.category._id}, {
						$pull: { courses: courseId },
						 })
					
					//Delete course id from Instructor
					await User.findByIdAndUpdate({_id : course.instructor._id}, {
						$pull: { courses: courseId },
						 })
					} catch (error) {
					  console.error(error)
					  return res.status(500).json({
						success: false,
						message: "Server error",
						error: error.message,
					  })
					}
			}
		}
		
		
	 
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully",error:error.message });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getEnrolledCourses=async (req,res) => {
	try {
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const enrolledCourses = await User.findById(id).populate({
			path : "courses",
				populate : { // deep populate
					path: "courseContent",
			}
		}
		).populate("courseProgress").exec();
        // console.log(enrolledCourses);
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: enrolledCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
	try {

		const id = req.user.id;
	const user = await User.findById(id);
	if (!user) {
		return res.status(404).json({
            success: false,
            message: "User not found",
        });
	}
	const image = req.files.pfp;
	if (!image) {
		return res.status(404).json({
            success: false,
            message: "Image not found",
        });
    }
	const uploadDetails = await uploadImageToCloudinary(
		image,
		process.env.FOLDER_NAME
	);
	console.log(uploadDetails);

	const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

    res.status(200).json({
        success: true,
        message: "Image updated successfully",
        data: updatedImage,
    });
		
	} catch (error) {
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}



}

//instructor dashboard
exports.instructorDashboard = async (req, res) => {
	try {
		const id = req.user.id;
		const courseData = await Course.find({instructor:id});
		const courseDetails = courseData.map((course) => {
			totalStudents = course?.studentsEnrolled?.length;
			totalRevenue = course?.price * totalStudents;
			const courseStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudents,
				totalRevenue,
			};
			return courseStats;
		});
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: courseDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}