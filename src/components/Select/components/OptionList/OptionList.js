import { useListBox } from "@react-aria/listbox";
import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useRef } from "react";
import styles from "../../Select.module.css";
import { Option } from "../Option";
import { OptionGroup } from "../OptionGroup";

const cx = classnames.bind(styles);

/**
 * Internal component that implements the option menu when the select is opened
 */
export const OptionList = ({ state, ...otherProps }) => {
  const ref = useRef();

  // useListBox has most of the data it needs already in state, so we don't have to repeat
  // ourselves in the first argument. that argument will be more more controlling the
  // behavior of the listbox itself, like should the focus wrap, isLoading,
  // loadMore for lazy loading.
  const { listBoxProps } = useListBox(otherProps, state, ref);

  const className = cx({ OptionList: true });

  return (
    <ul {...listBoxProps} className={className} ref={ref}>
      {[...state.collection].map((item) =>
        item.type === "section" ? (
          <OptionGroup group={item} key={item.key} state={state} />
        ) : (
          <Option item={item} key={item.key} state={state} />
        )
      )}
    </ul>
  );
};

OptionList.propTypes = {
  /** The select state obj */
  state: PropTypes.object,
  /** The ref of the activator button */
  triggerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.element }),
  ]),
};

OptionList.displayName = "Select.OptionList";
