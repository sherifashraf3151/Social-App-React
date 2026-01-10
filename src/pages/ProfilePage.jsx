// Import necessary components from @heroui/react for UI elements like Card, Image, Dropdown, etc.
// Import React hooks: useState for state management, useEffect for side effects, useRef for DOM references
// Import API functions from ProfileSevice for fetching user data and uploading photos
import { Card, CardHeader, CardBody, Image, Skeleton, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@heroui/react";
import { useState, useEffect, useRef } from "react";
import { getUserData, uploadProfilePhotoApi } from "../Services/ProfileSevice";

// Main component for the Profile Page
// Main component for the Profile Page
export default function ProfilePage() {
  // State to store user data fetched from API
  const [userData, setUserData] = useState(null);
  // State to track if data is still loading
  const [loading, setLoading] = useState(true);
  // State to track if a photo is being uploaded
  const [uploading, setUploading] = useState(false);
  // Ref to access the hidden file input element
  // Ref to access the hidden file input element
  const fileInputRef = useRef(null);

  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Call the API to get user data
        const data = await getUserData();
        // Update state with the fetched data
        setUserData(data);
      } 
      catch (error) {
        // Log any errors during fetching
        console.error("Error fetching user data:", error);
      } 
      finally {
        // Set loading to false after fetch completes
        setLoading(false);
      }
    };
    // Call the async function
    fetchUserData();
  }, []); // Empty dependency array means this runs only once on mount

  // Function to handle file selection from the input
  // Function to handle file selection from the input
  const handleFileChange = async (event) => {
    // Get the selected file from the event
    const file = event.target.files[0];
    // If no file selected, do nothing
    if (!file) return;

    // Log the selected file for debugging
    console.log("File selected:", file);
    // Set uploading state to true to show loading UI
    setUploading(true);
    try {
      // Log start of upload
      console.log("Uploading file...");
      // Call the API to upload the photo
      await uploadProfilePhotoApi(file);
      // Log successful upload
      console.log("Upload successful, refetching data...");
      // Refetch user data to get the updated photo URL
      const data = await getUserData();
      // Update state with new data
      setUserData(data);
      // Log the refetched data
      console.log("Data refetched:", data);
    } catch (error) {
      // Log any errors during upload
      console.error("Error uploading photo:", error);
    } finally {
      // Set uploading to false after process completes
      setUploading(false);
    }
  };

  // Function to trigger the file input click when dropdown item is clicked
  const handleEditPhotoClick = () => {
    // Programmatically click the hidden file input to open file dialog
    fileInputRef.current.click();
  };

  // If data is still loading, show loading skeleton
  // If data is still loading, show loading skeleton
  if (loading) {
    return <Card className="my-4 space-y-5 p-4" radius="lg">

        {/* Skeleton for profile image */}
        <div className="w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full size-20" />
          </div>
          {/* Skeletons for name and email */}
          <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
        
          {/* Skeleton for the photo */}
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300" />
          </Skeleton>
          {/* Additional skeletons for other content */}
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            
            </div>
    </Card>
  }

  // If no user data available, show error message
  if (!userData) {
    return <div>No user data available.</div>;
  }

  // Main render return
  // Main render return
  return (
    // Container div with styling for the profile page
    <div className="ProfilePage mt-2 w-[95%] md:w-xl mx-auto ">
      {/* Card component to hold the profile content */}
      <Card className="py-4">
        {/* Header of the card with user info and dropdown */}
        <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-between">
          {/* User name and email */}
          <div>
            <small className="text-default-500">{userData.user.email || "No email"}</small>
          <h4 className="font-bold text-large">{userData.user.name || "User Name"}</h4>
          </div>

          {/* Dropdown menu for actions */}
          <div>
            <Dropdown>
              {/* Trigger for the dropdown, an icon */}
      <DropdownTrigger>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
      </DropdownTrigger>
      {/* Menu items */}
      <DropdownMenu aria-label="Static Actions">
        {/* Item to edit photo, calls handleEditPhotoClick on click */}
        <DropdownItem key="edit" onClick={handleEditPhotoClick}>
          Edit Profile Photo
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
          </div>

        </CardHeader>
        {/* Hidden file input with ref and onChange handler */}
        <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*"/>
        {/* Body of the card with the photo */}
        <CardBody className="overflow-visible py-2">
          {/* If uploading, show skeleton, else show the image */}
          {uploading ? (
            <Skeleton className="rounded-xl">
              <div className="h-48 rounded-xl bg-default-300" />
            </Skeleton>
          ) : (
            <Image
              alt="Profile background"
              className="object-cover rounded-xl"
              // Source with timestamp to avoid cache issues
              src={`${userData.user.photo || "https://heroui.com/images/hero-card-complete.jpeg"}?t=${Date.now()}`}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
