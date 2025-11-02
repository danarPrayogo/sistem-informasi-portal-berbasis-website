// File: app/login/page.tsx

'use client'; // Wajib ada, karena kita menggunakan hooks (useFormState, useState)

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction, FormState } from './actions'; // Impor Server Action Anda
import { useState, useEffect } from 'react';

/**
 * Komponen terpisah untuk tombol submit.
 * Ini memungkinkan kita menampilkan status 'pending' (loading)
 * saat form sedang dikirim ke server.
 */
function LoginButton() {
  const { pending } = useFormStatus(); // Hook untuk cek status form

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-400 disabled:hover:scale-100"
    >
      {pending ? (
        <>
          <i className="fas fa-spinner fa-spin mr-2"></i>
          Memproses...
        </>
      ) : (
        <>
          <i className="fas fa-sign-in-alt mr-2"></i>
          Masuk
        </>
      )}
    </button>
  );
}

/**
 * Halaman Login Utama
 */
export default function LoginPage() {
  // Ini adalah pengganti 'handleLogin(event)'
  // 'formAction' akan memanggil loginAction di server
  // 'state' akan berisi pesan error jika ada
  const initialState: FormState = { message: null };
  const [state, formAction] = useActionState(loginAction, initialState);

  // Ini adalah pengganti 'togglePassword()'
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  return (
    // Kita tidak perlu <body> karena sudah ada di app/layout.tsx
    // Kita asumsikan layout Anda tidak memiliki nav/footer di halaman ini
    <div className="font-inter bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center transition-colors duration-300">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-dark/10 dark:from-primary/5 dark:to-primary-dark/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-dark/20 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md px-4">
        
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4 shadow-lg">
            <i className="fas fa-user-shield text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Login Admin
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Perumahan Sejahtera Desa Hajimena
          </p>
        </div>

        {/* Login Form (Ganti dengan Server Action) */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          
          {/* Ganti <form onsubmit="..."> dengan <form action={...}> */}
          <form action={formAction}>
            
            {/* Username Field */}
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <i className="fas fa-user mr-2"></i>Username
              </label>
              <input
                type="text"
                id="username"
                name="username" // 'name' sangat penting untuk Server Action
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                placeholder="Masukkan username"
                autoComplete="username"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <i className="fas fa-lock mr-2"></i>Password
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  name="password" // 'name' sangat penting
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <i id="passwordToggle" className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Tampilkan pesan error dari server */}
            {state.message && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm" role="alert">
                {state.message}
              </div>
            )}

            {/* Tombol Submit (Komponen kustom) */}
            <LoginButton />
          </form>

          {/* ... Sisa HTML (Security Notice, dll) ... */}
        </div>

        {/* Back to Home (Gunakan <Link>) */}
        <div className="text-center mt-6">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors">
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}