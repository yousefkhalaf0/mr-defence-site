import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCamera, FaUpload, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase"; // استورج كمان هنجيبه من فايل الفايربيز
import { db, auth } from "../../../firebase";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

// Custom CSS
const customStyles = `
  :root {
    --primary-color: #28353E;
    --primary-light: #394956;
    --primary-dark: #1a242b;
    --primary-hover: #334452;
    --accent-color: #4A6B8A;
    --light-bg: #F0F2F5;
    --text-light: #E0E0E0;
    --text-muted: #B0B8C0;
    --border-color: #3F4C56;
  }

  body {
    background-color: #EFF2F5;
    color: #333;
    font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  }
  
  .btn-custom-primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
  }
  
  .btn-custom-primary:hover {
    background-color: var(--primary-hover);
    border-color: var(--primary-hover);
    color: white;
  }
  
  .btn-outline-custom-primary {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  
  .btn-outline-custom-primary:hover {
    background-color: var(--primary-color);
    color: white;
  }
  
  .card {
    border: none;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
  }
  
  .card-header {
    background-color: var(--primary-color);
    color: white;
    border-top-left-radius: 10px !important;
    border-top-right-radius: 10px !important;
    padding: 15px 20px;
  }
  
  .form-control {
    border-radius: 6px;
    border: 1px solid #DEE2E6;
    padding: 10px 15px;
  }
  
  .form-control:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.2rem rgba(40, 53, 62, 0.25);
  }
  
  .avatar-container {
    border-radius: 50%;
    background-color: #E9ECEF;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  
  .avatar-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .upload-button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;
  }
  
  .section-title {
    color: var(--primary-color);
    font-weight: 600;
  }
  
  .input-group-text {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .btn-group .active {
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
  }
  
  .complete-btn {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
    padding: 12px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  
  .complete-btn:hover {
    background-color: var(--primary-hover);
    border-color: var(--primary-hover);
    color: white;
  }
  
  .file-input {
    display: none;
  }
`;

export default function Profile() {
  // References and state
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");
  const [gender, setGender] = useState("Male");
  const [bloodType, setBloodType] = useState("");
  const [isDiabetic, setIsDiabetic] = useState(false);
  const [hasHeartDisease, setHasHeartDisease] = useState(false);
  const [usesWheelchair, setUsesWheelchair] = useState(false);
  const [hasTattoo, setHasTattoo] = useState(false);
  const [hasScar, setHasScar] = useState(false);
  const [tattooLocation, setTattooLocation] = useState("");
  const [scarLocation, setScarLocation] = useState("");

  // Form fields state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    nativeLanguage: "",
    nationality: "",
    nid: "",
    passport: "",
    driverLicense: "",
    hieght: "",
    weight: "",
    homeLocation: null,
  });

  // Fetch user profile data when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate("/login");
          return;
        }

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Update form data
          setFormData({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            birthDate: userData.birthDate || "",
            nativeLanguage: userData.nativeLanguage || "",
            nationality: userData.nationality || "",
            nid: userData.nid || "",
            passport: userData.passport || "",
            driverLicense: userData.driverLicense || "",
            hieght: userData.hieght || "",
            weight: userData.weight || "",
            homeLocation: userData.homeLocation || null,
          });

          // Update other state variables
          setGender(userData.gender || "Male");
          setBloodType(userData.bloodType || "");
          setIsDiabetic(userData.isDiabetic || false);
          setHasHeartDisease(userData.hasHeartDisease || false);
          setUsesWheelchair(userData.usesWheelchair || false);
          setHasTattoo(userData.hasTattoo || false);
          setHasScar(userData.hasScar || false);
          setTattooLocation(userData.tattooLocation || "");
          setScarLocation(userData.scarLocation || "");

          // Set profile picture if exists
          if (userData.profilePicture) {
            setProfilePicture(userData.profilePicture);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Handle file upload
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const uploadToCloudinary = async (file) => {
    try {
      setUploadingImage(true);

      // Create form data for Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // The name of the preset you created
      formData.append("folder", "Profile Images"); // The folder where you want to store images

      // Upload to Cloudinary
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/mrdefencemedia/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setCloudinaryUrl(data.secure_url);
        console.log("Image uploaded to Cloudinary:", data.secure_url);
      } else {
        console.error("Failed to upload to Cloudinary:", data);
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error occurred while uploading the image.");
    } finally {
      setUploadingImage(false);
    }
  };
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      let uploadedImageUrl = "";

      if (fileInputRef.current.files[0]) {
        const imageRef = ref(
          storage,
          `profilePictures/${user.uid}/${fileInputRef.current.files[0].name}`
        );
        await uploadBytes(imageRef, fileInputRef.current.files[0]);
        uploadedImageUrl = await getDownloadURL(imageRef);
      }

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          ...formData,
          gender,
          bloodType,
          usesWheelchair,
          isDiabetic,
          hasHeartDisease,
          hasTattoo,
          tattooLocation,
          hasScar,
          scarLocation,
          profilePicture: uploadedImageUrl || profilePicture, // Use existing profile picture if no new upload
          updatedAt: new Date(),
        },
        { merge: true }
      ); // Use merge to update existing fields without overwriting other fields

      console.log("Profile updated successfully!");
      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong while updating your profile.");
    }
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="py-4">
        <div className="container">
          <div className="mb-4">
            <h1 className="h3 text-dark mb-2">Profile Setup</h1>
            <p className="text-muted mb-4">Let's complete your profile</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0 text-light">Personal Information</h5>
              </div>
              <div className="card-body">
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block mb-3">
                    <div className="avatar-container">
                      {profilePicture ? (
                        <img src={profilePicture} alt="Profile" />
                      ) : (
                        <FaCamera className="text-secondary" size={32} />
                      )}
                    </div>
                    <button
                      type="button"
                      className="position-absolute bottom-0 end-0 upload-button"
                      onClick={handleUploadClick}
                    >
                      <FaUpload size={14} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="file-input"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <p className="text-muted small">
                    Upload a profile picture (Optional)
                  </p>
                </div>

                <div className="row justify-content-center mb-4">
                  <div className="col-md-6">
                    <div className="btn-group w-100">
                      <button
                        type="button"
                        className={`btn ${
                          gender === "male" ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setGender("male")}
                      >
                        Male
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          gender === "female" ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setGender("female")}
                      >
                        Female
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Birth Of Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      placeholder="DD/MM/YYYY"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Native Language</label>
                    <input
                      type="text"
                      className="form-control"
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      placeholder="Enter your language"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Nationality</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      placeholder="Enter your nationality"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0 text-light">Document Information</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">National ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleInputChange}
                      placeholder="Enter your national ID"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Passport</label>
                    <input
                      type="text"
                      className="form-control"
                      name="passport"
                      value={formData.passport}
                      onChange={handleInputChange}
                      placeholder="Enter your passport ID"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Driver License</label>
                    <input
                      type="text"
                      className="form-control"
                      name="driverLicense"
                      value={formData.driverLicense}
                      onChange={handleInputChange}
                      placeholder="Enter your license ID"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Height</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder="Enter height"
                      />
                      <span className="input-group-text">CM</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Weight</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="Enter weight"
                      />
                      <span className="input-group-text">KG</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0 text-light">Medical Information</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Your blood type?</label>
                    <div className="btn-group w-100">
                      <button
                        type="button"
                        className={`btn ${
                          bloodType === "B+" ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setBloodType("B+")}
                      >
                        B+
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          bloodType !== "B+" ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setBloodType("Other")}
                      >
                        Other
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Using a wheelchair?</label>
                    <div className="btn-group w-100">
                      <button
                        type="button"
                        className={`btn ${
                          usesWheelchair ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setUsesWheelchair(true)}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          !usesWheelchair ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setUsesWheelchair(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Are you diabetic?</label>
                    <div className="btn-group w-100">
                      <button
                        type="button"
                        className={`btn ${
                          isDiabetic ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setIsDiabetic(true)}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          !isDiabetic ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setIsDiabetic(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Have heart disease?</label>
                    <div className="btn-group w-100">
                      <button
                        type="button"
                        className={`btn ${
                          hasHeartDisease ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setHasHeartDisease(true)}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          !hasHeartDisease ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setHasHeartDisease(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0 text-white">Signs Information</h5>
              </div>
              <div className="card-body">
                <p className="text-muted mb-3">
                  Do you have any signs or tattoos? If so, where are they
                  located?
                </p>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Tattoo</label>
                    <div className="btn-group w-100 mb-2">
                      <button
                        type="button"
                        className={`btn ${
                          hasTattoo ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setHasTattoo(true)}
                      >
                        Left arm
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          !hasTattoo ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setHasTattoo(false)}
                      >
                        No
                      </button>
                    </div>
                    {hasTattoo && (
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Describe tattoo location"
                        value={tattooLocation}
                        onChange={(e) => setTattooLocation(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Scar</label>
                    <div className="btn-group w-100 mb-2">
                      <button
                        type="button"
                        className={`btn ${
                          hasScar ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setHasScar(true)}
                      >
                        Left arm
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          !hasScar ? "active" : ""
                        } btn-outline-custom-primary`}
                        onClick={() => setHasScar(false)}
                      >
                        No
                      </button>
                    </div>
                    {hasScar && (
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Describe scar location"
                        value={scarLocation}
                        onChange={(e) => setScarLocation(e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-grid mb-4">
              <button type="submit" className="btn complete-btn">
                Complete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}