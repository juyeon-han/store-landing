import Variables from '@/styles/scss/variables.module.scss';
import ArrowLeft from './svg/arrowLeft.svg?react';
import ArrowRight from './svg/arrowRight.svg?react';
import Clock from './svg/clock.svg?react';
import Close from './svg/close.svg?react';
import Customers from './svg/customers.svg?react';
import Location from './svg/location.svg?react';
import Phone from './svg/phone.svg?react';
import Sessions from './svg/sessions.svg?react';
import Year from './svg/year.svg?react';

export const icons = {
  ArrowLeft,
  ArrowRight,
  Clock,
  Close,
  Customers,
  Location,
  Phone,
  Sessions,
  Year,
};

export const colors = {
  white: Variables.white,
  gray50: Variables.gray50,
  gray100: Variables.gray100,
  gray200: Variables.gray200,
  gray300: Variables.gray300,
  gray400: Variables.gray400,
  gray500: Variables.gray500,
  gray600: Variables.gray600,
  gray700: Variables.gray700,
  gray800: Variables.gray800,
  gray900: Variables.gray900,
  brown50: Variables.brown50,
  brown100: Variables.brown100,
  brown200: Variables.brown200,
  brown300: Variables.brown300,
  brown400: Variables.brown400,
  brown500: Variables.brown500,
  brown600: Variables.brown600,
  brown700: Variables.brown700,
  brown800: Variables.brown800,
  brown900: Variables.brown900,
  brand50: Variables.brand50,
  brand100: Variables.brand100,
  brand200: Variables.brand200,
  brand300: Variables.brand300,
  brand400: Variables.brand400,
  brand500: Variables.brand500,
};

export type IconNameType = keyof typeof icons;
export type IconColorType = keyof typeof colors;
