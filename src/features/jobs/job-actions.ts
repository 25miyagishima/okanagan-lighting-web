"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { JobStatus } from "@/types/app";
import type { Job } from "@/types/database";

type JobRow = {
  id: string;
  client_id: string;
  quote_id: string;
  assigned_installer_id: string | null;
  status: JobStatus;
  scheduled_start: string | null;
  scheduled_end: string | null;
  job_address: string | null;
  crew_notes: string | null;
  install_notes: string | null;
  special_instructions: string | null;
  start_time: string | null;
  completed_time: string | null;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
};

function mapJobRow(row: JobRow): Job {
  return {
    id: row.id,
    clientId: row.client_id,
    quoteId: row.quote_id,
    assignedInstallerId: row.assigned_installer_id,
    status: row.status,
    scheduledStart: row.scheduled_start,
    scheduledEnd: row.scheduled_end,
    jobAddress: row.job_address,
    crewNotes: row.crew_notes,
    installNotes: row.install_notes,
    specialInstructions: row.special_instructions,
    startTime: row.start_time,
    completedTime: row.completed_time,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    archivedAt: row.archived_at,
  };
}

export async function getJobs(): Promise<Job[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .is("archived_at", null)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((row) => mapJobRow(row as JobRow));
}

export async function createJobFromQuote(quoteId: string) {
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { data: existingJob, error: existingJobError } = await supabase
    .from("jobs")
    .select("id")
    .eq("quote_id", quoteId)
    .maybeSingle();

  if (existingJobError) {
    return {
      error: existingJobError.message,
    };
  }

  if (existingJob) {
    return {
      success: true,
      jobId: existingJob.id,
    };
  }

  const { data: quote, error: quoteError } = await supabase
    .from("quotes")
    .select("id, client_id")
    .eq("id", quoteId)
    .single();

  if (quoteError || !quote) {
    return {
      error: quoteError?.message ?? "Quote not found.",
    };
  }

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("site_address")
    .eq("id", quote.client_id)
    .maybeSingle();

  if (clientError) {
    return {
      error: clientError.message,
    };
  }

  const { data: job, error } = await supabase
    .from("jobs")
    .insert({
      quote_id: quote.id,
      client_id: quote.client_id,
      status: "approved",
      job_address: client?.site_address ?? null,
      created_at: now,
      updated_at: now,
    })
    .select("id")
    .single();

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/jobs");
  revalidatePath("/quotes");
  revalidatePath(`/quotes/${quoteId}`);
  revalidatePath("/dashboard");

  return {
    success: true,
    jobId: job.id,
  };
}

export async function updateJobStatus(id: string, status: JobStatus) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("jobs")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/jobs");
  revalidatePath(`/jobs/${id}`);
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}