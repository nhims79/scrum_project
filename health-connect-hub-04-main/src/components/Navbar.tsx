import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, LogOut } from "lucide-react";

type StoredUser = {
  id?: string;
  email?: string;
  fullName?: string;
  avatarUrl?: string;
};

const STORAGE_KEY = "user";          // Key lưu user trong localStorage
const AUTH_EVENT = "auth-changed";   // custom event để đồng bộ navbar

function readUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);             // mobile menu
  const [user, setUser] = useState<StoredUser | null>(readUser());
  const [openUserMenu, setOpenUserMenu] = useState(false); // dropdown desktop
  const navigate = useNavigate();

  // đồng bộ khi login/logout từ tab hiện tại hoặc tab khác
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setUser(readUser());
    };
    const onAuthChanged = () => setUser(readUser());
    window.addEventListener("storage", onStorage);
    window.addEventListener(AUTH_EVENT, onAuthChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(AUTH_EVENT, onAuthChanged);
    };
  }, []);

  const displayName = user?.fullName?.trim() || user?.email || "User";
  const initials = displayName?.charAt(0)?.toUpperCase?.() || "U";

  const handleSignOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
    setOpenUserMenu(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <Heart className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
            <span className="text-xl font-bold text-foreground">HealthConnect</span>
          </Link>

          {/* Right (desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {/* Đã Bỏ Symptom Checker & Departments */}

            {!user ? (
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setOpenUserMenu(v => !v)}
                  className="flex items-center gap-3 rounded-md border border-border px-3 py-2 hover:bg-muted/50"
                >
                  {/* avatar fallback */}
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {initials}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {displayName}
                  </span>
                </button>

                {openUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-card shadow-lg overflow-hidden">
                    {/* Nếu có trang Profile thì mở khóa item này:
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-muted/50 text-foreground"
                      onClick={() => setOpenUserMenu(false)}
                    >
                      Profile
                    </Link>
                    */}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-muted/50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hiển thị nút View booking history khi đã đăng nhập */}
            {user && (
              <Button asChild>
                <Link to="/history" className="ml-6 text-sm text-foreground">
                  View booking history
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(v => !v)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            {!user ? (
              <Button asChild className="w-full">
                <Link to="/auth">Sign In</Link>
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {initials}
                  </div>
                  <div className="text-sm font-medium text-foreground">{displayName}</div>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
