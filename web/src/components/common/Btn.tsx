
import React, { useEffect, createRef, useState } from 'react';
import { Button } from "@chakra-ui/react";

type Props = {
    children?: React.ReactNode | string;
    onClick?: (e?: any) => void;
    rightIcon?: JSX.Element;
    leftIcon?: JSX.Element;
    m?: string | number;
    borderRadius?: string | number;
    w?: string | number;
    h?: string | number;
    boxShadow?: string;
    bg?: string;
    mt?: string | number;
    mr?: string | number;
    type?: 'button' | 'submit' | 'reset';
}

const Btn = (props: Props) => {
    const { children, bg, ...more } = props;
    const [active, setActive] = useState('');
    const element = createRef<HTMLButtonElement>();

    useEffect(() => {
        let timeout: any;
        const handleScaleBtn = () => {
            setActive('active');
            timeout = setTimeout(() => {
                setActive('');
            }, 400);
        }

        element.current?.addEventListener('click', handleScaleBtn);
        return () => {
            clearTimeout(timeout);
            element.current?.removeEventListener('click', handleScaleBtn);
        }
    }, [])

    return (
        <Button
            bgGradient={bg ? 'none' : 'linear(to-r, brand.100, brand.200)'}
            bg={bg}
            borderRadius="100"
            boxShadow='md'
            h={9}
            color='white'
            overflow='hidden'
            _before={{
                content: '""',
                display: 'block',
                backgroundColor: '#fff',
                position: 'absolute',
                top: '35%',
                left: '50%',
                width: 'calc(100% * 1.4)',
                height: '0.5rem',
                transform: 'translateX(-100%) rotate(-60deg)',
                transition: 'all 0.4s ease-in-out',
                zIndex: 10,
            }}
            transform="translateX('100%')"
            _hover={{
                '&::before': {
                    transform: 'translateX(0%) rotate(-60deg)',
                },
                transform: 'scale(115%)',
            }}

            className={active}
            ref={element}
            {...more}
        >
            {children ? children : 'Click me'}
        </Button>
    )
};

export default Btn;
