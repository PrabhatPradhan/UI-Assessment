"use client";

import { useState } from "react";
import { ChevronDown, CircleHelp, Clock, FileText, Search } from "lucide-react";

import AppShell from "../../components/AppShell";
import Badge from "../../components/Badge";
import Tabs from "../../components/Tabs";
import EmptyState from "../../components/EmptyState";

import { faqs, guides, openTickets, supportChannels, systemStatus } from "../../data/help";

const categories = [
  { key: "all", label: "All" },
  { key: "Payments", label: "Payments" },
  { key: "Payouts", label: "Payouts" },
  { key: "Refunds", label: "Refunds" },
  { key: "Disputes", label: "Disputes" },
  { key: "Account", label: "Account" },
];

const statusTone = {
  operational: { label: "Working", tone: "green" },
  degraded: { label: "Slow", tone: "amber" },
  down: { label: "Down", tone: "red" },
};

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [openFaqId, setOpenFaqId] = useState("faq-1");

  const searchText = search.trim().toLowerCase();

  const faqsBeforeCategory = faqs.filter((faq) => {
    return (
      searchText === "" ||
      faq.question.toLowerCase().includes(searchText) ||
      faq.answer.toLowerCase().includes(searchText)
    );
  });

  const filteredFaqs = faqsBeforeCategory.filter((faq) => {
    return category === "all" || faq.category === category;
  });

  const tabsWithCounts = categories.map((item) => ({
    ...item,
    count: item.key === "all" ? faqsBeforeCategory.length : faqsBeforeCategory.filter((f) => f.category === item.key).length,
  }));

  function toggleFaq(id) {
    setOpenFaqId(openFaqId === id ? null : id);
  }

  return (
    <AppShell title="Help" subtitle="Answers, guides and a way to reach us">
      {/* search + support channels */}
      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h2 className="text-base font-semibold text-gray-900">How can we help?</h2>
        <p className="text-sm text-gray-500">Search the help centre or talk to the support team.</p>

        <div className="relative mt-3">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search help articles, for example: payout on hold"
            aria-label="Search help articles"
            className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="cards-grid-3 mt-4">
          {supportChannels.map((channel) => (
            <div key={channel.id} className="flex flex-col rounded-md border border-gray-200 p-3">
              <p className="text-sm font-medium text-gray-900">{channel.title}</p>
              <p className="mt-0.5 text-sm text-gray-600">{channel.detail}</p>
              <p className="mt-0.5 flex-1 text-xs text-gray-500">{channel.availability}</p>
              <button
                type="button"
                className="mt-3 h-9 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {channel.action}
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="split-grid">
        {/* FAQs */}
        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="px-4 pt-3">
            <h2 className="text-sm font-semibold text-gray-900">Common questions</h2>
            <p className="text-xs text-gray-500">{filteredFaqs.length} articles</p>

            <div className="mt-2 border-b border-gray-200">
              <Tabs tabs={tabsWithCounts} activeKey={category} onChange={setCategory} />
            </div>
          </div>

          {filteredFaqs.length === 0 ? (
            <EmptyState
              title="Nothing found"
              message="Try a shorter search, for example 'refund' or 'payout', or start a chat with support."
              actionLabel="Clear search"
              onAction={() => {
                setSearch("");
                setCategory("all");
              }}
            />
          ) : (
            <ul className="divide-y divide-gray-100">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;

                return (
                  <li key={faq.id}>
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-gray-50"
                    >
                      <CircleHelp size={16} className="mt-0.5 shrink-0 text-gray-400" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-gray-900">{faq.question}</span>
                        <span className="mt-0.5 block text-xs text-gray-500">{faq.category}</span>
                      </span>
                      <ChevronDown
                        size={16}
                        className={`mt-0.5 shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isOpen && <p className="px-4 pb-4 pl-11 text-sm leading-6 text-gray-600">{faq.answer}</p>}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* right column */}
        <div className="flex flex-col gap-4">
          <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="px-4 py-3">
              <h2 className="text-sm font-semibold text-gray-900">System status</h2>
              <p className="text-xs text-gray-500">Live for the last hour</p>
            </div>
            <ul className="divide-y divide-gray-100 border-t border-gray-100">
              {systemStatus.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-3 px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="text-sm text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.note}</p>
                  </div>
                  <Badge label={statusTone[item.status].label} tone={statusTone[item.status].tone} />
                </li>
              ))}
            </ul>
          </section>

          <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="px-4 py-3">
              <h2 className="text-sm font-semibold text-gray-900">Your support tickets</h2>
              <p className="text-xs text-gray-500">{openTickets.length} open</p>
            </div>
            <ul className="divide-y divide-gray-100 border-t border-gray-100">
              {openTickets.map((ticket) => (
                <li key={ticket.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="min-w-0 text-sm font-medium text-gray-900">{ticket.subject}</p>
                    <Badge
                      label={ticket.status === "waiting_on_you" ? "Needs you" : "With support"}
                      tone={ticket.status === "waiting_on_you" ? "amber" : "blue"}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {ticket.id} · opened {ticket.openedOn}
                  </p>
                  <p className="text-xs text-gray-500">{ticket.lastReply}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* guides */}
      <div>
        <h2 className="mb-3 text-base font-semibold text-gray-900">Step by step guides</h2>

        <div className="cards-grid-3">
          {guides.map((guide) => (
            <a
              key={guide.id}
              href="#"
              onClick={(event) => event.preventDefault()}
              className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 hover:border-gray-300 hover:bg-gray-50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500">
                <FileText size={18} strokeWidth={1.75} />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-gray-900">{guide.title}</h3>
              <p className="mt-1 flex-1 text-sm leading-5 text-gray-600">{guide.description}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-gray-500">
                <Clock size={14} />
                {guide.minutes} min read
              </span>
            </a>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
