import Box from './BoxItem';
import PlantText from './plantText';
const CompOBJ = {
  text: PlantText,
  box: Box
};
export default {
  functional: true,
  render: function(createElement, context) {
    let props = context.props;
    const getComps = (val = 'text') => {
      val = CompOBJ[val.toLowerCase()];
      return val || PlantText;
    };
    return createElement(
      getComps(props.showType),
      context.data,
      context.children
    );
  }
};
