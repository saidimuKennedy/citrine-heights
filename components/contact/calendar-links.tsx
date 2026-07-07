"use client";

import { useMemo } from "react";

interface CalendarLinksProps {
  title: string;
  description: string;
  attendeeName: string;
  attendeeEmail: string;
}

function getNextBusinessDay(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }
  date.setHours(10, 0, 0, 0);
  return date;
}

function formatGoogleDate(date: Date): string {
  const end = new Date(date.getTime() + 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return `${fmt(date)}/${fmt(end)}`;
}

function formatIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function CalendarLinks({
  title,
  description,
  attendeeName,
  attendeeEmail,
}: CalendarLinksProps) {
  const startDate = useMemo(() => getNextBusinessDay(), []);

  const googleUrl = useMemo(() => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      details: `${description}\n\nAttendee: ${attendeeName} (${attendeeEmail})`,
      location: "Citrine Heights Sales Gallery, Westlands Road, Nairobi",
      dates: formatGoogleDate(startDate),
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, [title, description, attendeeName, attendeeEmail, startDate]);

  const outlookUrl = useMemo(() => {
    const end = new Date(startDate.getTime() + 60 * 60 * 1000);
    const params = new URLSearchParams({
      subject: title,
      body: `${description}\n\nAttendee: ${attendeeName} (${attendeeEmail})`,
      location: "Citrine Heights Sales Gallery, Westlands Road, Nairobi",
      startdt: startDate.toISOString(),
      enddt: end.toISOString(),
    });
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
  }, [title, description, attendeeName, attendeeEmail, startDate]);

  const appleUrl = useMemo(() => {
    const end = new Date(startDate.getTime() + 60 * 60 * 1000);
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${formatIcsDate(startDate)}`,
      `DTEND:${formatIcsDate(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      "LOCATION:Citrine Heights Sales Gallery, Westlands Road, Nairobi",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  }, [title, description, startDate]);

  return (
    <div>
      <p className="mb-4 text-[10px] font-semibold tracking-[0.24em] text-[#555555]">
        ADD CONSULTATION TO CALENDAR
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[#111111]/15 px-5 py-2.5 text-[10px] font-semibold tracking-[0.2em] text-[#111111] transition-all duration-500 hover:border-[#C6A46A] hover:text-[#C6A46A]"
        >
          GOOGLE
        </a>
        <a
          href={appleUrl}
          download="citrine-heights-consultation.ics"
          className="border border-[#111111]/15 px-5 py-2.5 text-[10px] font-semibold tracking-[0.2em] text-[#111111] transition-all duration-500 hover:border-[#C6A46A] hover:text-[#C6A46A]"
        >
          APPLE
        </a>
        <a
          href={outlookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[#111111]/15 px-5 py-2.5 text-[10px] font-semibold tracking-[0.2em] text-[#111111] transition-all duration-500 hover:border-[#C6A46A] hover:text-[#C6A46A]"
        >
          OUTLOOK
        </a>
      </div>
    </div>
  );
}
