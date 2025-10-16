import { useForm } from "react-hook-form";
import { authClient } from "../../api/auth";
import { RhfInput } from "../../../components/input";
import { Link } from "react-router";

type SignUpCreds = {
  email: string;
  password: string;
  name: string;
};

const SignUpPage = () => {
  const form = useForm<SignUpCreds>();

  const submit = (data: SignUpCreds) => {
    authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  };
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="card bg-base-200">
        <form onSubmit={form.handleSubmit(submit)} className="card-body">
          <RhfInput
            name="email"
            control={form.control}
            title="E-mail"
            placeholder="name@mail.com"
          />
          <RhfInput
            name="password"
            type="password"
            placeholder="*********"
            control={form.control}
            title="Password"
          />
          <RhfInput
            name="name"
            control={form.control}
            title="Name"
            placeholder="John Doe"
          />
          <button
            type="submit"
            disabled
            className="cursor-not-allowed btn btn-primary mt-4"
          >
            Sign Up
          </button>
          <Link to="/admin" className="link link-hover link-neutral">
            Already have an account? Sign In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
