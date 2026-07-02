import { Button } from "./ui/button";
import { DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import Image from "next/image";
import { signIn } from "next-auth/react";

const SignInDialog = () => {
  const handleLoginWithGoogleClick = async () => {
    await signIn("google");
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do google
        </DialogDescription>
      </DialogHeader>
      <Button
        variant="outline"
        className="font-bold"
        onClick={handleLoginWithGoogleClick}
      >
        <Image src="/google.svg" width={18} height={18} alt="ícone do google" />
        Google
      </Button>
    </>
  );
};

export default SignInDialog;
