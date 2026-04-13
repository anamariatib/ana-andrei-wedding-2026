import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import {
  motion,
  type HTMLMotionProps,
  type MotionProps,
  type Transition,
} from 'framer-motion';

type ButtonVariant = 'solid' | 'outline';

type BaseButtonProps = {
  children: ReactNode;
  className?: string;
  iconLeft?: ReactNode;
  variant?: ButtonVariant;
};

type SafeAnchorProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof MotionProps
>;

type SafeNativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof MotionProps
>;

type LinkButtonProps = BaseButtonProps &
  SafeAnchorProps & {
    href: string;
    motionProps?: HTMLMotionProps<'a'>;
  };

type NativeButtonProps = BaseButtonProps &
  SafeNativeButtonProps & {
    href?: never;
    motionProps?: HTMLMotionProps<'button'>;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

function appendClasses(
  ...classNames: Array<string | false | null | undefined>
) {
  return classNames.filter(Boolean).join(' ');
}

export default function Button(props: Readonly<ButtonProps>) {
  const {
    children,
    className,
    iconLeft,
    variant = 'solid',
    motionProps,
    ...restProps
  } = props;

  const buttonClassName = appendClasses(
    variant === 'solid' ? 'btn-solid' : 'btn-outline',
    'inline-flex items-center justify-center gap-3 group transition-colors duration-300',
    className,
  );

  const defaultMotion = {
    whileHover: {
      scale: 1.02,
      y: -2,
    },
    whileTap: {
      scale: 0.98,
    },
    transition: {
      duration: 0.4,
      ease: [0.6, 1, 0.5, 1],
    } as Transition,
  };

  const content = (
    <>
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      <span>{children}</span>
    </>
  );

  if (restProps.href) {
    const { href, ...linkProps } = restProps as LinkButtonProps;
    return (
      <motion.a
        href={href}
        {...defaultMotion}
        {...(motionProps as HTMLMotionProps<'a'>)}
        className={buttonClassName}
        {...linkProps}
      >
        {content}
      </motion.a>
    );
  }

  const { type = 'button', ...buttonProps } = restProps as NativeButtonProps;
  return (
    <motion.button
      type={type}
      {...defaultMotion}
      {...(motionProps as HTMLMotionProps<'button'>)}
      className={buttonClassName}
      {...buttonProps}
    >
      {content}
    </motion.button>
  );
}
