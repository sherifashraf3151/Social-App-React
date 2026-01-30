import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Skeleton,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/react";

import { useRef } from "react";
import { getUserData, uploadProfilePhotoApi } from "../Services/ProfileSevice";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProfilePage() {

  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();

  /* =======================
    Fetch User Data
  ======================= */
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserData,
  });

  /* =======================
    Upload Profile Photo
  ======================= */
  const { mutate: uploadPhoto, isPending: uploading } = useMutation({
    mutationFn: uploadProfilePhotoApi,
    onSuccess: () => {
      // refetch user data after successful upload
      queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error) => {
      console.error("Error uploading photo:", error);
    },
  });

  /* =======================
    Handlers
  ======================= */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    uploadPhoto(file);
  };

  const handleEditPhotoClick = () => {
    fileInputRef.current.click();
  };

  /* =======================
    Loading State
  ======================= */
  if (isLoading) {
    return (
      <div className="profileLoading w-[95%] md:w-xl mx-auto">
        <Card className="my-4 space-y-5 p-4" radius="lg">
          <div className="w-full flex items-center gap-3">
            <Skeleton className="flex rounded-full size-20" />
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>

          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300" />
          </Skeleton>
        </Card>
      </div>
    );
  }

  if (isError || !userData) {
    return <div>Failed to load user data.</div>;
  }

  /* =======================
    Render
  ======================= */
  return (
    <div className="ProfilePage mt-2 w-[95%] md:w-xl mx-auto">
      <Card className="py-4">

        <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-between">
          <div>
            <small className="text-default-500">
              {userData.user.email || "No email"}
            </small>
            <h4 className="font-bold text-large">
              {userData.user.name || "User Name"}
            </h4>
          </div>

          <Dropdown>
            <DropdownTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </DropdownTrigger>

            <DropdownMenu>
              <DropdownItem key="edit" onClick={handleEditPhotoClick}>
                Edit Profile Photo
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>

        {/* hidden file input */}
        <input
          type="file"
          hidden
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
        />

        <CardBody className="overflow-visible py-2">
          {uploading ? (
            <Skeleton className="rounded-xl">
              <div className="h-48 rounded-xl bg-default-300" />
            </Skeleton>
          ) : (
            <Image
              alt="Profile background"
              className="object-cover rounded-xl"
              src={`${userData.user.photo || "https://heroui.com/images/hero-card-complete.jpeg"}?t=${Date.now()}`}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
