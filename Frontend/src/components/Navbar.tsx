
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, Sun, Cloud, Sprout, BarChart2, MessageCircle, BookOpen, ChevronDown, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: t('dashboard'), icon: <Sun className="h-5 w-5 mr-2" />, path: '/' },
    { name: t('weather'), icon: <Cloud className="h-5 w-5 mr-2" />, path: '/weather' },
    { name: t('disease'), icon: <Sprout className="h-5 w-5 mr-2" />, path: '/disease-prediction' },
    { name: t('soil'), icon: <Thermometer className="h-5 w-5 mr-2" />, path: '/soil-parameters' },
    { name: t('market'), icon: <BarChart2 className="h-5 w-5 mr-2" />, path: '/market-prices' },
    { name: t('schemes'), icon: <Bell className="h-5 w-5 mr-2" />, path: '/schemes' },
    { name: t('chatbot'), icon: <MessageCircle className="h-5 w-5 mr-2" />, path: '/chatbot' },
    { name: t('knowledge'), icon: <BookOpen className="h-5 w-5 mr-2" />, path: '/knowledge-hub' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Sprout className="h-8 w-8 text-kisan-primary" />
                <span className="ml-2 text-xl font-poppins font-bold text-kisan-dark-brown">
                  Kisan-<span className="text-kisan-primary">Sathi</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex md:items-center md:space-x-4">
              {menuItems.slice(0, 5).map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-600 hover:text-kisan-primary px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  {item.name}
                </Link>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center text-gray-600">
                    {t('more')} <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {menuItems.slice(5).map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.path} className="flex items-center w-full">
                        {item.icon}
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <LanguageSelector />
              <Button size="sm" className="ml-4 bg-kisan-primary hover:bg-kisan-secondary text-white">
                {t('login')}
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <LanguageSelector />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-kisan-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && isMobile && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center text-gray-600 hover:bg-kisan-light/10 hover:text-kisan-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Button 
              className="w-full mt-4 bg-kisan-primary hover:bg-kisan-secondary text-white"
              onClick={() => setIsOpen(false)}
            >
              {t('login')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
