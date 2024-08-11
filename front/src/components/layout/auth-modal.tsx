import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  SyntheticEvent,
} from "react";
import Image from "next/image";
import { SignInForm } from "./sign-in-form";
import { Button } from "@/components/shared"
import { SignUpForm } from "./sign-up-form";
import { ResetPasswordForm } from "./reset-password-form";
import Link from "next/link";

type FormType = 'sign-in' | 'sign-up' | 'reset-password';

const AuthModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [formType, setFormType] = useState<FormType>('sign-in')

  const onFormToggle = (type: string) => {
    setFormType(type as FormType);
  }

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="/">
            <Image
              src="/mm_circle.png"
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </a>

          <>
            <h3 className="font-display text-2xl font-bold">
              {formType === 'sign-in' && 'Log in'}
              {formType === 'sign-up' && 'Sign up'}
              {formType === 'reset-password' && 'Reset Password'}
            </h3>
            <div className="w-full space-y-5">
              {formType === 'sign-in' && (
                <>
                  <SignInForm className="w-full"/> 
                  <p className="w-full text-sm text-muted-foreground text-center">
                    <Link href="/" className="underline underline-offset-4 hover:text-primary" onClick={() => setFormType('reset-password')}>
                      Forgot password?
                    </Link>
                  </p>
                </>
              )
              }
              {formType === 'sign-up' && <SignUpForm className="w-full"/> }
              {formType === 'reset-password' && <ResetPasswordForm className="w-full" /> }
              
              

              <p className="w-full text-sm text-muted-foreground">
                {formType === 'sign-in' && `Don't have an account?` }
                {formType === 'sign-up' && 'Already have an account?' }
                
                <Button
                  variant="link"
                  onClick={() => onFormToggle((formType === 'sign-in') ? 'sign-up' : 'sign-in')}
                  className="underline underline-offset-4 hover:text-primary text-blue-500"
                >
                  {formType === 'sign-in' && 'Sign up' }
                  {formType === 'sign-up' && 'Log in' }
                </Button>
              </p>
            </div>
          </>
        </div>
      </div>
    </Modal>
  );
};

export function useAuthModal() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const AuthModalCallback = useCallback(() => {
    return (
      <AuthModal
        showSignInModal={showAuthModal}
        setShowSignInModal={setShowAuthModal}
      />
    );
  }, [showAuthModal, setShowAuthModal]);

  return useMemo(
    () => ({ setShowAuthModal, AuthModal: AuthModalCallback }),
    [setShowAuthModal, AuthModalCallback],
  );
}
