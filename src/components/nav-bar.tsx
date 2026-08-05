'use client';
 
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
 
import { SvgIconProps, Tooltip, Box, Drawer, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContent';
import { useState } from 'react';
 
export const NAV_WIDTH = 76;
const DRAWER_WIDTH = 240;
 
interface NavIcon {
  title: string;
  icon: React.ComponentType<SvgIconProps>;
  href: string;
}
 
const mainNavIcons: NavIcon[] = [
  { title: 'Home', icon: HomeIcon, href: '/' },
  { title: 'Recipes', icon: RestaurantMenuIcon, href: '/recipes' },
  { title: 'Profile', icon: PersonIcon, href: '/profile' },
  { title: 'Saved Recipes', icon: BookmarkIcon, href: '/saved' },
];
 
export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthed, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
 
  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    router.push('/login');
  };
 
  // showLabel: the desktop rail is icon-only (with tooltips), while the mobile
  // drawer is wide enough to show text labels next to each icon — same data,
  // two presentations. onNavigate closes the drawer after a link is tapped,
  // since a mobile menu should get out of the way once the user picks something.
  const renderIcon = (
    { title, icon: Icon, href }: NavIcon,
    { showLabel = false, onNavigate }: { showLabel?: boolean; onNavigate?: () => void } = {}
  ) => {
    const active = pathname === href;
 
    const content = (
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: showLabel ? 1.5 : 0,
          justifyContent: showLabel ? 'flex-start' : 'center',
          width: showLabel ? '100%' : 44,
          height: 44,
          px: showLabel ? 2 : 0,
          borderRadius: 2.5,
          color: active ? 'primary.main' : 'grey.100',
          backgroundColor: active ? 'common.white' : 'transparent',
          boxShadow: active ? '0 2px 8px rgba(0, 0, 0, 0.18)' : 'none',
          transition: 'background-color 0.2s ease, color 0.2s ease, transform 0.15s ease',
          '&:hover': {
            backgroundColor: active ? 'common.white' : 'rgba(255, 255, 255, 0.14)',
            transform: showLabel ? 'none' : 'scale(1.08)',
          },
          '&:active': { transform: showLabel ? 'none' : 'scale(0.96)' },
        }}
      >
        <Icon sx={{ fontSize: 22 }} />
        {showLabel && <Typography sx={{ fontWeight: 500 }}>{title}</Typography>}
      </Box>
    );
 
    const link = (
      <Link key={title} href={href} onClick={onNavigate} style={{ display: 'flex', width: showLabel ? '100%' : 'auto' }}>
        {content}
      </Link>
    );
 
    return showLabel ? link : (
      <Tooltip key={title} title={title} placement="right" arrow>
        {link}
      </Tooltip>
    );
  };
 
  const renderLogoutButton = ({ showLabel = false }: { showLabel?: boolean } = {}) => (
    <Box
      onClick={handleLogout}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: showLabel ? 1.5 : 0,
        justifyContent: showLabel ? 'flex-start' : 'center',
        width: showLabel ? '100%' : 44,
        height: 44,
        px: showLabel ? 2 : 0,
        borderRadius: 2.5,
        color: 'grey.100',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease, transform 0.15s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.14)',
          transform: showLabel ? 'none' : 'scale(1.08)',
        },
        '&:active': { transform: showLabel ? 'none' : 'scale(0.96)' },
      }}
    >
      <LogoutIcon sx={{ fontSize: 22 }} />
      {showLabel && <Typography sx={{ fontWeight: 500 }}>Logout</Typography>}
    </Box>
  );
 
  // Shared between the desktop rail and the mobile drawer — same items, just
  // rendered with/without labels and different container styling.
  const navContent = (showLabel: boolean, onNavigate?: () => void) => (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: showLabel ? 'stretch' : 'center', gap: showLabel ? 1 : 2.5, width: '100%' }}>
        {mainNavIcons.map((item) => renderIcon(item, { showLabel, onNavigate }))}
      </Box>
 
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: showLabel ? 'stretch' : 'center',
          width: '100%',
          pt: 2,
          mt: 'auto',
          borderTop: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        {isAuthed
          ? renderLogoutButton({ showLabel })
          : renderIcon({ title: 'Login', icon: LoginIcon, href: '/login' }, { showLabel, onNavigate })}
      </Box>
    </>
  );
 
  return (
    <>
      {/* Desktop fixed rail — unchanged behavior, icon-only with tooltips */}
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'primary.main',
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: { xs: 0, sm: NAV_WIDTH },
          height: '100vh',
          py: 3,
          px: 2,
          boxShadow: '2px 0 12px rgba(0, 0, 0, 0.12)',
          zIndex: 1200,
        }}
      >
        {navContent(false)}
      </Box>
 
      {/* Mobile top bar with hamburger trigger */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          alignItems: 'center',
          width: '100%',
          px: 2,
          py: 1.5,
          backgroundColor: 'primary.main',
          position: 'sticky',
          top: 0,
          zIndex: 1200,
        }}
      >
        <IconButton onClick={() => setMobileOpen(true)} sx={{ color: 'white' }} aria-label="Open menu">
          <MenuIcon />
        </IconButton>
      </Box>
 
      {/* Mobile drawer — same nav items, shown with labels, closes on link tap */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }} // better open performance on repeat mobile toggles
      >
        <Box
          sx={{
            width: DRAWER_WIDTH,
            height: '100%',
            backgroundColor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            py: 2,
            px: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: 'white' }} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Box>
          {navContent(true, () => setMobileOpen(false))}
        </Box>
      </Drawer>
    </>
  );
}
