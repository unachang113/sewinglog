import {type MicroCMSContentId, type MicroCMSDate, type MicroCMSImage} from 'microcms-js-sdk';

export type Image = {
  readonly fieldId: string;
  readonly image: MicroCMSImage;
  readonly alt: string;
};

export type Category = {
  readonly name: string;
} & MicroCMSDate &
  MicroCMSContentId;

export type Post = {
  readonly title: string;
  readonly images: Image[];
  readonly category?: Category;
  readonly publishedAt: MicroCMSDate['publishedAt'];
  readonly modifiedAt: MicroCMSDate['updatedAt'];
  readonly description: string;
  readonly material?: string;
} & MicroCMSContentId;
