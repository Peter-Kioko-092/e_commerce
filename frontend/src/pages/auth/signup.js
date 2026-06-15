import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthCard from "@/components/AuthCard";
import GoogleButton from "@/components/GoogleButton";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signUpWithEmail, signInWithGoogle, isSupabaseConfigured } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await signUpWithEmail(email, password);
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess(true);
  };

  const handleGoogle = async () => {
    setError("");
    const { error: googleError } = await signInWithGoogle();
    if (googleError) setError(googleError.message);
  };

  if (success) {
    return (
      <AuthCard title="Check your inbox">
        <p className="text-sm text-muted">
          We&apos;ve sent a confirmation link to <strong className="text-ink">{email}</strong>.
          Confirm your email to finish creating your account, then{" "}
          <Link href="/auth/login" className="text-accent hover:underline">
            log in
          </Link>
          .
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Join Mzizi to track orders and save your details."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-accent hover:underline">
            Log in
          </Link>
        </>
      }
    >
      {!isSupabaseConfigured && (
        <p className="mb-4 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-xs text-warning">
          Supabase isn&apos;t configured yet. This form is ready for backend
          wiring &mdash; submissions won&apos;t authenticate until
          environment variables are set.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm text-muted">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm text-muted">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent"
          />
        </div>

        {error && <p className="text-xs text-danger">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="text-xs text-muted">or</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <GoogleButton onClick={handleGoogle} label="Sign up with Google" />
    </AuthCard>
  );
}
