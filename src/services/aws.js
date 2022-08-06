import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

export const s3 = new AWS.S3({
  params: {
    Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}/${process.env.REACT_APP_AWS_FOLDER_NAME}`,
  },
  region: process.env.REACT_APP_AWS_REGION,
});

export const imageUrl = {
  S3ACCOUNTS_URL: `https://${process.env.REACT_APP_AWS_BUCKET_ACCOUNTS}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/`,
  ACCOUNT_DISPLAY_URL: process.env.REACT_APP_AWS_FOLDER_ACCOUNT_DISPLAY_URL,
  ACCOUNT_THUMBNAIL_URL: `${process.env.REACT_APP_AWS_FOLDER_ACCOUNT_THUMBNAIL_URL}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/`,

  S3GAME_URL: `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/`,
  GAME_DISPLAY_URL: process.env.REACT_APP_AWS_FOLDER_GAME_DISPLAY_URL,
  GAME_THUMBNAIL_URL: `${process.env.REACT_APP_AWS_FOLDER_GAME_THUMBNAIL_URL}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/`,

  S3GAME_URL1: `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.amazonaws.com/`,
  GAME_THUMBNAIL_URL1: `${process.env.REACT_APP_AWS_FOLDER_GAME_THUMBNAIL_URL}.s3.amazonaws.com/`,
};

export default AWS;
