function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-2 text-3xl font-bold">Login</h1>
        <p className="mb-6 text-slate-300">
          Sign in to continue to your RoomieMatch account.
        </p>

        <form className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage