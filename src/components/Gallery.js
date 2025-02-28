import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';

/**
 * Gallery - displays up to 6 images in a simple responsive grid with a lightbox to view the images.
 * @example ./docs/Gallery.md
 * @extends PureComponent
 */
export class Gallery extends React.PureComponent {
  static propTypes = {
    images: PropTypes.array.isRequired,
  };

  state = {
    lightboxIsOpen: false,
    imageIndex: 0,
  };

  openLightbox = (i) => {
    this.setState({
      lightboxIsOpen: true,
      imageIndex: i,
    });
  };
  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false,
      imageIndex: 0,
    });
  };

  gotoPrevLightboxImage = () => {
    this.setState({
      imageIndex: this.state.imageIndex - 1,
    });
  };
  gotoNextLightboxImage = () => {
    this.setState({
      imageIndex: this.state.imageIndex + 1,
    });
  };

  render() {
    const { images } = this.props;
    const formattedArray = images.map((image) => ({
      src: image.image_url || image.thumb_url,
    }));

    return (
      <div className="str-chat__gallery">
        {images.slice(0, 3).map((image, i) => (
          <div
            className="str-chat__gallery-image"
            key={`gallery-image-${i}`}
            onClick={() => this.openLightbox(i)}
          >
            <img src={image.image_url || image.thumb_url} />
          </div>
        ))}
        {images.length > 3 && (
          <div
            className="str-chat__gallery-placeholder"
            style={{
              background: `url(${images[3].image_url}) top left no-repeat`,
              backgroundSize: 'cover',
            }}
            onClick={() => this.openLightbox(3)}
          >
            <p>{images.length - 3} more</p>
          </div>
        )}
        <Lightbox
          images={formattedArray}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevLightboxImage}
          onClickNext={this.gotoNextLightboxImage}
          onClose={this.closeLightbox}
          backdropClosesModal
          currentImage={this.state.imageIndex}
        />
      </div>
    );
  }
}
