"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { useState } from "react"
import { Bell, Lock, Eye } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    detailedReports: true,
    privateMode: false,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Settings</h1>
          <p className="text-foreground-muted">Manage your preferences and account</p>
        </div>

        <div className="card-premium space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Email Notifications</p>
                  <p className="text-sm text-foreground-muted">Get updates about new features</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => toggleSetting("emailNotifications")}
                className="w-5 h-5 rounded"
              />
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Detailed Reports</p>
                  <p className="text-sm text-foreground-muted">Enable comprehensive analysis details</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.detailedReports}
                onChange={() => toggleSetting("detailedReports")}
                className="w-5 h-5 rounded"
              />
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Private Mode</p>
                  <p className="text-sm text-foreground-muted">Don't save analysis history</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.privateMode}
                onChange={() => toggleSetting("privateMode")}
                className="w-5 h-5 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
