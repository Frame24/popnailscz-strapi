import type { Schema, Struct } from '@strapi/strapi';

export interface BlogBlog extends Struct.ComponentSchema {
  collectionName: 'components_blog_blogs';
  info: {
    displayName: 'Blog';
  };
  attributes: {
    BlogText: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface ButtonButton extends Struct.ComponentSchema {
  collectionName: 'components_button_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    ButtonLink: Schema.Attribute.String;
    ButtonText: Schema.Attribute.String;
  };
}

export interface ContactContact extends Struct.ComponentSchema {
  collectionName: 'components_contact_contacts';
  info: {
    displayName: 'Contact';
  };
  attributes: {
    ContactText: Schema.Attribute.Blocks;
    ContactTitle: Schema.Attribute.String;
  };
}

export interface GalleryGallery extends Struct.ComponentSchema {
  collectionName: 'components_gallery_galleries';
  info: {
    displayName: 'Gallery';
  };
  attributes: {
    altText: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface PriceListPriceList extends Struct.ComponentSchema {
  collectionName: 'components_price_list_price_lists';
  info: {
    description: '';
    displayName: 'PriceList';
  };
  attributes: {
    duration: Schema.Attribute.String;
    name: Schema.Attribute.String;
    price: Schema.Attribute.String;
  };
}

export interface QaQa extends Struct.ComponentSchema {
  collectionName: 'components_qa_qas';
  info: {
    displayName: 'QA';
  };
  attributes: {
    Answer: Schema.Attribute.Text;
    Question: Schema.Attribute.String;
  };
}

export interface ReviewReview extends Struct.ComponentSchema {
  collectionName: 'components_review_reviews';
  info: {
    displayName: 'Review';
  };
  attributes: {
    ReviewerName: Schema.Attribute.String;
    ReviewText: Schema.Attribute.Text;
  };
}

export interface StudioComponentsStudioComponents
  extends Struct.ComponentSchema {
  collectionName: 'components_studio_components_studio_components';
  info: {
    displayName: 'StudioComponents';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog.blog': BlogBlog;
      'button.button': ButtonButton;
      'contact.contact': ContactContact;
      'gallery.gallery': GalleryGallery;
      'price-list.price-list': PriceListPriceList;
      'qa.qa': QaQa;
      'review.review': ReviewReview;
      'studio-components.studio-components': StudioComponentsStudioComponents;
    }
  }
}
