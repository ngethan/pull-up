"use server";

import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export const postToDB = (supabase: SupabaseClient<any, "public", any>, dest: string, body: any) => {
    "use server";
    return new Promise<any>(async (resolve, reject) => {
        const { error } = await supabase.from(dest).insert(body);
        if (error)
            reject(error);
        resolve(true);
    });
}

export const updateDB = (supabase: SupabaseClient<any, "public", any>, dest: string, id: string, body: any) => {
    "use server";
    return new Promise<any>(async (resolve, reject) => {
        const { data, error } = await supabase.from(dest).update(body).eq('id', id).select();
        if (error)
            reject(error);
        resolve(data);
    });
}

export const getAllFromDB = (supabase: SupabaseClient<any, "public", any>, dest: string) => {
    "use server";
    return new Promise<any>(async (resolve, reject) => {
        const { data, error } = await supabase.from(dest).select();
        if (error)
            reject(error);
        resolve(data);
    });
}

export const getColFromDB = (supabase: SupabaseClient<any, "public", any>, dest: string, col: string) => {
    "use server";
    return new Promise<any>(async (resolve, reject) => {
        const { data, error } = await supabase.from(dest).select(col);
        if (error)
            reject(error);
        resolve(data);
    });
}

export const getOneFromDB = (supabase: SupabaseClient<any, "public", any>, dest: string, id: string) => {
    "use server";
    return new Promise<any>(async (resolve, reject) => {
        const { data, error } = await supabase.from(dest).select().eq('id', id);
        if (error)
            reject(error);
        resolve(data);
    });
}

export const deleteOneFromDB = (supabase: SupabaseClient<any, "public", any>, dest: string, id: string) => {
    "use server";
    return new Promise<any>(async (resolve, reject) => {
        const { data, error } = await supabase.from(dest).delete().eq('id', id);
        if (error)
            reject(error);
        resolve(true);
    });
}

export async function getAllFromDBWithMatch<T>(supabase: SupabaseClient<any, "public", any>, dest: string, param: string, value: T) {
    "use server";
    return new Promise<any>(async (resolve, reject) => {
        const { data, error } = await supabase.from(dest).select().eq(param, value);
        if (error)
            reject(error);
        resolve(data);
    });
}

export async function getAllFromDBWithContains<T>(supabase: SupabaseClient<any, "public", any>, dest: string, param: string, value: T) {
    "use server";
    return new Promise<any>(async (resolve, reject) => {
        const { data, error } = await supabase.from(dest).select().contains(param, [value]);
        if (error)
            reject(error);
        resolve(data);
    });
}