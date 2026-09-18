"use client";

import { useState } from "react";
import { CircleCheck, TriangleAlert } from "lucide-react";

import AppShell from "../../components/AppShell";
import Badge from "../../components/Badge";
import Tabs from "../../components/Tabs";
import Avatar from "../../components/Avatar";
import CopyButton from "../../components/CopyButton";

import {
  apiKeys,
  businessProfile,
  notificationSettings,
  paymentMethodSettings,
  teamMembers,
  webhooks,
} from "../../data/settings";

const tabs = [
  { key: "business", label: "Business" },
  { key: "team", label: "Team" },
  { key: "methods", label: "Payment methods" },
  { key: "notifications", label: "Notifications" },
  { key: "developers", label: "Developers" },
];

// a small on/off switch
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? "bg-brand-500" : "bg-gray-300"}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${checked ? "left-[18px]" : "left-0.5"}`}
      />
    </button>
  );
}

function Field({ label, value, hint, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <input
        type={type}
        defaultValue={value}
        className="h-9 w-full rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-900 hover:border-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      />
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("business");
  const [methods, setMethods] = useState(paymentMethodSettings);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [savedMessage, setSavedMessage] = useState("");

  function toggleMethod(id) {
    setMethods(methods.map((method) => (method.id === id ? { ...method, enabled: !method.enabled } : method)));
  }

  function toggleNotification(id, channel) {
    setNotifications(
      notifications.map((item) => (item.id === id ? { ...item, [channel]: !item[channel] } : item))
    );
  }

  function save() {
    setSavedMessage("Changes saved");
    setTimeout(() => setSavedMessage(""), 3000);
  }

  return (
    <AppShell title="Settings" subtitle="Your business, team and payment preferences">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-4">
          <Tabs tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />
        </div>

        {/* ---------------- Business ---------------- */}
        {activeTab === "business" && (
          <div className="p-4">
            <div className="mb-4 flex items-start gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-3">
              <CircleCheck size={16} className="mt-0.5 shrink-0 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-emerald-900">KYC verified</p>
                <p className="text-sm text-emerald-800">
                  Your account is fully activated. Payouts run on a T+2 working day cycle.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <Field label="Registered business name" value={businessProfile.businessName} />
              <Field label="Name shown to customers" value={businessProfile.displayName} hint="Appears on the payment page and bank statement" />
              <Field label="Website" value={businessProfile.website} />
              <Field label="Business category" value={businessProfile.category} />
              <Field label="Support email" value={businessProfile.supportEmail} type="email" />
              <Field label="Support phone" value={businessProfile.supportPhone} />
              <Field label="GSTIN" value={businessProfile.gstin} />
              <Field label="PAN" value={businessProfile.pan} />
            </div>

            <div className="mt-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-gray-700">Registered address</span>
                <textarea
                  defaultValue={businessProfile.address}
                  rows={2}
                  className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm text-gray-900 hover:border-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </label>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={save}
                className="h-9 rounded-md bg-gray-900 px-4 text-sm font-medium text-white hover:bg-gray-800"
              >
                Save changes
              </button>
              <button
                type="button"
                className="h-9 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              {savedMessage && <span className="text-sm text-emerald-700">{savedMessage}</span>}
            </div>
          </div>
        )}

        {/* ---------------- Team ---------------- */}
        {activeTab === "team" && (
          <div>
            <div className="flex items-center justify-between gap-3 p-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Team members</h2>
                <p className="text-xs text-gray-500">{teamMembers.length} people can open this dashboard</p>
              </div>
              <button
                type="button"
                className="h-9 rounded-md bg-gray-900 px-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Invite member
              </button>
            </div>

            <div className="table-wrap border-t border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500">
                    <th scope="col" className="px-4 py-2.5 font-medium">Member</th>
                    <th scope="col" className="col-secondary whitespace-nowrap px-4 py-2.5 font-medium">Role</th>
                    <th scope="col" className="col-optional whitespace-nowrap px-4 py-2.5 font-medium">Can see</th>
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 font-medium">Last active</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="table-avatar">
                            <Avatar name={member.name} />
                          </span>
                          <div className="min-w-0 max-w-[190px]">
                            <p className="truncate font-medium text-gray-900">{member.name}</p>
                            <p className="truncate text-xs text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="col-secondary whitespace-nowrap px-4 py-3 text-gray-600">{member.role}</td>
                      <td className="col-optional px-4 py-3 text-gray-600">{member.access}</td>
                      <td className="px-4 py-3 text-gray-600">{member.lastActive}</td>
                      <td className="px-4 py-3">
                        <Badge
                          label={member.status === "active" ? "Active" : "Invited"}
                          tone={member.status === "active" ? "green" : "amber"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="txn-list divide-y divide-gray-100 border-t border-gray-200">
              {teamMembers.map((member) => (
                <li key={member.id} className="flex items-center gap-3 px-4 py-3">
                  <Avatar name={member.name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="truncate text-xs text-gray-500">
                      {member.role} · {member.access}
                    </p>
                  </div>
                  <Badge
                    label={member.status === "active" ? "Active" : "Invited"}
                    tone={member.status === "active" ? "green" : "amber"}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ---------------- Payment methods ---------------- */}
        {activeTab === "methods" && (
          <div className="p-4">
            <h2 className="text-sm font-semibold text-gray-900">Methods shown at checkout</h2>
            <p className="text-xs text-gray-500">Turn a method off and customers will not see it on the payment page.</p>

            <ul className="mt-4 space-y-2">
              {methods.map((method) => (
                <li
                  key={method.id}
                  className="flex items-start gap-3 rounded-md border border-gray-200 p-3 hover:border-gray-300"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{method.name}</p>
                      <Badge label={method.fee} tone="gray" withDot={false} />
                    </div>
                    <p className="mt-0.5 text-sm text-gray-600">{method.note}</p>
                  </div>
                  <Toggle
                    checked={method.enabled}
                    onChange={() => toggleMethod(method.id)}
                    label={`Turn ${method.name} ${method.enabled ? "off" : "on"}`}
                  />
                </li>
              ))}
            </ul>

            <p className="mt-3 text-xs text-gray-500">
              Fees are charged per successful payment and 18% GST is added on top. Failed payments are free.
            </p>
          </div>
        )}

        {/* ---------------- Notifications ---------------- */}
        {activeTab === "notifications" && (
          <div className="p-4">
            <h2 className="text-sm font-semibold text-gray-900">When should we tell you?</h2>
            <p className="text-xs text-gray-500">These settings are for your account only, not for the whole team.</p>

            <ul className="mt-4 space-y-2">
              {notifications.map((item) => (
                <li key={item.id} className="rounded-md border border-gray-200 p-3">
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="mt-0.5 text-sm text-gray-600">{item.note}</p>

                  <div className="mt-2.5 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div className="flex items-center gap-2">
                      <Toggle
                        checked={item.email}
                        onChange={() => toggleNotification(item.id, "email")}
                        label={`Email for ${item.label}`}
                      />
                      <span className="text-sm text-gray-600">Email</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Toggle
                        checked={item.sms}
                        onChange={() => toggleNotification(item.id, "sms")}
                        label={`SMS for ${item.label}`}
                      />
                      <span className="text-sm text-gray-600">SMS</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ---------------- Developers ---------------- */}
        {activeTab === "developers" && (
          <div className="p-4">
            <h2 className="text-sm font-semibold text-gray-900">API keys</h2>
            <p className="text-xs text-gray-500">Use the test key while you build. Never put the live key in your website code.</p>

            <ul className="mt-3 space-y-2">
              {apiKeys.map((key) => (
                <li key={key.id} className="rounded-md border border-gray-200 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{key.label}</p>
                      <Badge label={key.mode} tone={key.mode === "Live" ? "green" : "gray"} withDot={false} />
                    </div>
                    <button
                      type="button"
                      className="h-8 rounded-md border border-gray-300 bg-white px-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Roll key
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <code className="min-w-0 truncate rounded bg-gray-50 px-2 py-1 text-xs text-gray-700">{key.value}</code>
                    <CopyButton value={key.value} label="Copy API key" />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">
                    Created {key.createdOn} · last used {key.lastUsed}
                  </p>
                </li>
              ))}
            </ul>

            <h2 className="mt-6 text-sm font-semibold text-gray-900">Webhooks</h2>
            <p className="text-xs text-gray-500">We call these URLs whenever something happens in your account.</p>

            <ul className="mt-3 space-y-2">
              {webhooks.map((hook) => (
                <li key={hook.id} className="rounded-md border border-gray-200 p-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <code className="min-w-0 break-all text-sm text-gray-900">{hook.url}</code>
                    <Badge
                      label={hook.status === "active" ? "Active" : "Failing"}
                      tone={hook.status === "active" ? "green" : "red"}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{hook.events}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{hook.lastDelivery}</p>

                  {hook.status === "failing" && (
                    <div className="mt-2 flex gap-2 rounded-md border border-red-200 bg-red-50 p-2.5">
                      <TriangleAlert size={16} className="mt-0.5 shrink-0 text-red-600" />
                      <p className="text-sm leading-5 text-red-900">
                        Your server replied with a 500 error three times. We stop retrying after 24 hours.
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </AppShell>
  );
}
