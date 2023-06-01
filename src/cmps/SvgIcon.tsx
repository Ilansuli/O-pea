import React from 'react';
import { svgService } from '../services/svg.service';

type SvgIconProps = {
    iconName: string,
    className: string
};

const SvgIcon: React.FC<SvgIconProps> = ({ iconName, className }) => {
    const svg = svgService.getSvg(iconName);

    return (
        <i className={className} dangerouslySetInnerHTML={{ __html: svg }} ></i>
    );
}
export default SvgIcon