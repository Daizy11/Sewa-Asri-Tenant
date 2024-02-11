'use client'

interface User {
    id: string;
    name: string;
    photo: string;
}

function setUser(user: User) {
    localStorage.setItem("user-store", JSON.stringify(user));
}

function getUser() {
    const user = typeof window !== "undefined" ? localStorage.getItem("user-store") : false ;

    if (user) {
        const result: User = JSON.parse(user);
        return result;
    }
    return null;
}

export { setUser, getUser };