import * as React from 'react';
import * as PropTypes from 'prop-types';

const Heading = ({ children, level, background, ...restProps}) => {
    let levels = new Set([1, 2, 3, 4, 5, 6]);
    let Element = 'h1';

    if (levels.has(level)) {
        Element = `h${level}`;
    }

    return <Element 
    style={{ background: `${background}`}}{...restProps}>{children}
    </Element>
}

Heading.propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    children: PropTypes.string,
    background: PropTypes.oneOf(['red', 'blue', 'green']),
}

export default Heading;