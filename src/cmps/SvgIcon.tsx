import React from 'react';
import { MouseEvent } from 'react';

import { svgService } from '../services/svg.service';

type SvgIconProps = {
    iconName: string,
    className: string,
    onClick?: (ev: MouseEvent<HTMLButtonElement>) => any
};

const SvgIcon: React.FC<SvgIconProps> = ({ iconName, className, onClick }) => {
    const svg = svgService.getSvg(iconName);

    return (
        <i onClick={onClick} className={className} dangerouslySetInnerHTML={{ __html: svg }} ></i>
    );
}
export default SvgIcon