import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient({ cookies });

export const postToDB = (dest: string, body: any) => {
    return new Promise(async (resolve, reject) => {
        const { error } = await supabase.from(dest).insert(body);
        if (error)
            reject(error);
        resolve(true);
    });
}

export const updateDB = (dest: string, id: number, body: any) => {
    return new Promise(async (resolve, reject) => {
        const { data, error } = await supabase.from(dest).update(body).eq('id', id).select();
        if (error)
            reject(error);
        resolve(data);
    });
}

export const getAllFromDB = (dest: string) => {
    return new Promise(async (resolve, reject) => {
        const { data, error } = await supabase.from(dest).select();
        if (error)
            reject(error);
        resolve(data);
    });
}

export const getColFromDB = (dest: string, col: string) => {
    return new Promise(async (resolve, reject) => {
        const { data, error } = await supabase.from(dest).select(col);
        if (error)
            reject(error);
        resolve(data);
    });
}

export const getOneFromDB = (dest: string, id: number) => {
    return new Promise(async (resolve, reject) => {
        const { data, error } = await supabase.from(dest).select().eq('id', id);
        if (error)
            reject(error);
        resolve(data);
    });
}

export const deleteOneFromDB = (dest: string, id: number) => {
    return new Promise(async (resolve, reject) => {
        const { data, error } = await supabase.from(dest).delete().eq('id', id);
        if (error)
            reject(error);
        resolve(true);
    });
}