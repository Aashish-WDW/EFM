'use client';
import { useState, useEffect } from 'react';
import { Sun, Moon, Type, Globe, Edit, Lock as LockIcon, Download, Save, X } from 'lucide-react';
import RandomLetterReveal from '@/components/shared/RandomLetterReveal';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  department: z.string().min(2, "Department is required"),
});

const passwordSchema = z.object({
  oldPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ProfilePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }
    return 'dark';
  });

  const [textSize, setTextSize] = useState<'small' | 'medium' | 'chunky'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('efm-text-size') as 'small' | 'medium' | 'chunky') || 'medium';
    }
    return 'medium';
  });

  const [language, setLanguage] = useState<'en' | 'hi' | 'te' | 'kn'>('en');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  
  // User Data State
  const [userData, setUserData] = useState({
    fullName: 'Admin User',
    email: 'admin@test.com',
    phone: '555-0001',
    role: 'Super Admin',
    department: 'Admin',
    status: 'Active'
  });

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast.info("Installation prompt is not available. Your browser might not support it or the app is already installed.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      toast.success("App installed successfully!");
    }
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('efm-theme', theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem('efm-theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const sizeMap = {
      small: '14px',
      medium: '16px',
      chunky: '20px',
    };
    root.style.setProperty('--base-font-size', sizeMap[textSize]);
    root.style.fontSize = sizeMap[textSize];
    localStorage.setItem('efm-text-size', textSize);
  }, [textSize]);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      department: userData.department,
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onProfileSubmit(values: z.infer<typeof profileSchema>) {
    setUserData(prev => ({ ...prev, ...values }));
    setIsEditOpen(false);
    toast.success("Profile updated successfully!");
  }

  function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    setIsPasswordOpen(false);
    passwordForm.reset();
    toast.success("Password changed successfully!");
  }

  return (
    <div className="space-y-6 text-foreground">
      <h1 className="display-sm">
        <RandomLetterReveal text="Profile" />
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl pb-12">
        {/* Profile Info */}
        <div className="bg-surface-container-highest rounded-xl p-6 edge-glow">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-display text-xl font-bold text-primary">
                {userData.fullName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="heading-lg text-foreground">{userData.fullName}</h2>
              <p className="text-sm text-muted-foreground">{userData.role}</p>
              <p className="text-xs text-muted-foreground mono-data uppercase tracking-wider mt-1 opacity-60">{userData.email}</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              ['Full Name', userData.fullName], 
              ['Email', userData.email], 
              ['Phone', userData.phone], 
              ['Role', userData.role], 
              ['Department', userData.department], 
              ['Status', userData.status]
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm text-foreground font-medium">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {/* Edit Profile Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <button className="h-9 px-4 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Edit className="w-4 h-4" /> Edit Profile
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-surface-container-highest border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Edit Profile</DialogTitle>
                </DialogHeader>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={profileForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-surface-container-high border-border text-foreground" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Email</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-surface-container-high border-border text-foreground" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Phone</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-surface-container-high border-border text-foreground" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Department</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-surface-container-high border-border text-foreground" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            {/* Change Password Dialog */}
            <Dialog open={isPasswordOpen} onOpenChange={setIsPasswordOpen}>
              <DialogTrigger asChild>
                <button className="h-9 px-4 rounded-lg bg-surface-container-high text-muted-foreground text-sm hover:text-foreground transition-all flex items-center gap-2 border border-border">
                  <LockIcon className="w-4 h-4" /> Change Password
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-surface-container-highest border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Change Password</DialogTitle>
                </DialogHeader>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={passwordForm.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} className="bg-surface-container-high border-border text-foreground" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} className="bg-surface-container-high border-border text-foreground" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} className="bg-surface-container-high border-border text-foreground" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <button 
                        type="button"
                        onClick={() => {
                          setIsPasswordOpen(false);
                          toast.info("Password reset instructions sent to your email.");
                        }}
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <LockIcon className="w-4 h-4 mr-2" /> Update Password
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            <button 
              onClick={handleInstallClick}
              className="h-9 px-4 rounded-lg bg-success/15 text-success text-sm hover:bg-success/25 transition-all flex items-center gap-2 border border-success/20"
            >
              <Download className="w-4 h-4" /> Install App
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <div className="bg-surface-container-highest rounded-xl p-6 edge-glow">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Appearance</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-xl transition-all border ${
                  theme === 'dark'
                    ? 'bg-primary/5 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]'
                    : 'bg-surface-container-high border-transparent hover:border-white/10'
                }`}
              >
                <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`}>Dark</span>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-xl transition-all border ${
                  theme === 'light'
                    ? 'bg-primary/5 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]'
                    : 'bg-surface-container-high border-transparent hover:border-white/10'
                }`}
              >
                <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`}>Light</span>
              </button>
            </div>
          </div>

          {/* Text Size */}
          <div className="bg-surface-container-highest rounded-xl p-6 edge-glow">
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-3.5 h-3.5 text-muted-foreground" />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Text Size</h3>
            </div>
            <div className="flex gap-2">
              {[
                { id: 'small', label: 'SMALL', iconScale: 0.8 },
                { id: 'medium', label: 'MEDIUM', iconScale: 1.0 },
                { id: 'chunky', label: 'CHUNKY', iconScale: 1.3 },
              ].map((size) => (
                <button
                  key={size.id}
                  onClick={() => setTextSize(size.id as 'small' | 'medium' | 'chunky')}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 py-6 rounded-xl transition-all border ${
                    textSize === size.id
                      ? 'bg-foreground border-foreground text-background scale-[1.02] shadow-lg'
                      : 'bg-surface-container-high border-transparent text-muted-foreground hover:border-white/10'
                  }`}
                >
                  <span className="text-xl font-bold" style={{ fontSize: `${1.2 * size.iconScale}rem` }}>A</span>
                  <span className="text-[9px] font-bold tracking-[0.2em]">{size.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="bg-surface-container-highest rounded-xl p-6 edge-glow">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Language</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'en', code: 'EN', name: 'ENGLISH', native: 'English' },
                { id: 'hi', code: 'HI', name: 'HINDI', native: 'हिन्दी' },
                { id: 'te', code: 'TE', name: 'TELUGU', native: 'తెలుగు' },
                { id: 'kn', code: 'KN', name: 'KANNADA', native: 'ಕನ್ನಡ' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id as 'en' | 'hi' | 'te' | 'kn')}
                  className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl transition-all border ${
                    language === lang.id
                      ? 'bg-foreground border-foreground text-background shadow-lg'
                      : 'bg-surface-container-high border-transparent text-muted-foreground hover:border-white/10'
                  }`}
                >
                  <span className="text-xs font-bold tracking-widest">{lang.code}</span>
                  <div className="text-center">
                    <p className="text-[8px] font-bold tracking-wider leading-none mb-0.5">{lang.name}</p>
                    <p className="text-[8px] opacity-60 leading-none">{lang.native}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
