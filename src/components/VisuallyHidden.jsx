import PropTypes from 'prop-types';
export const VisuallyHidden = ({ className, ...rest }) => (
  <span
    className={className}
    style={{
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: 0,
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: 0,
    }}
    {...rest}
  />
);

VisuallyHidden.propTypes = {
  className: PropTypes.string,
};
