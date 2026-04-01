function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-slate-300">
          Welcome to your RoomieMatch dashboard.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-2 text-lg font-semibold">My Profile</h2>
          <p className="text-slate-300">
            Manage your preferences, habits, and location settings.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-2 text-lg font-semibold">My Matches</h2>
          <p className="text-slate-300">
            View compatible roommate suggestions.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-2 text-lg font-semibold">Messages</h2>
          <p className="text-slate-300">
            Open conversations with potential roommates.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage