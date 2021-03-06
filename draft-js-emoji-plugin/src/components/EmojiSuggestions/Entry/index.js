import React, {
  // PropTypes,
  Component,
} from 'react';
import EmojiToolkit from 'emoji-toolkit';
import emojiList from '../../../utils/emojiList';
import convertShortNameToUnicode from '../../../utils/convertShortNameToUnicode';

export default class Entry extends Component {

  constructor(props) {
    super(props);
    this.mouseDown = false;
  }

  componentDidUpdate() {
    this.mouseDown = false;
  }

  onMouseUp = () => {
    if (this.mouseDown) {
      this.mouseDown = false;
      this.props.onEmojiSelect(this.props.emoji);
    }
  };

  onMouseDown = (event) => {
    // Note: important to avoid a content edit change
    event.preventDefault();

    this.mouseDown = true;
  };

  onMouseEnter = () => {
    this.props.onEmojiFocus(this.props.index);
  };

  render() {
    const { theme = {}, imagePath, imageType, cacheBustParam, useNativeArt, isFocused, id } = this.props;
    const className = isFocused ? theme.emojiSuggestionsEntryFocused : theme.emojiSuggestionsEntry;
    const emojiListItem = EmojiToolkit.emojiList[this.props.emoji];

    let emojiDisplay = null;
    if (useNativeArt === true || emojiListItem == null) {
      const unicode = emojiList.list[this.props.emoji];
      emojiDisplay = (
        <span
          className={theme.emojiSuggestionsEntryIcon}
        >
          {convertShortNameToUnicode(unicode)}
        </span>
      );
    } else {
      // short name to image url code steal from emojione source code
      const codePointsForImage = emojiListItem.uc_base;
      const fullImagePath = `${imagePath}${codePointsForImage}.${imageType}${cacheBustParam}`;
      emojiDisplay = (
        <img
          src={fullImagePath}
          className={theme.emojiSuggestionsEntryIcon}
          role="presentation"
        />
      );
    }

    return (
      <div
        className={className}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseEnter={this.onMouseEnter}
        role="option"
        id={id}
        aria-selected={isFocused ? 'true' : null}
      >
        {emojiDisplay}
        <span className={theme.emojiSuggestionsEntryText}>
          {this.props.emoji}
        </span>
      </div>
    );
  }
}
