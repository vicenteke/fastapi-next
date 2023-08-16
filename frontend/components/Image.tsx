import NextImage from "next/image";
import Block from "./Block";

interface Props extends React.ComponentProps<typeof NextImage> {
  title?: string
  caption?: string
}

/* Description: implementation of an image element using best practices. It is
 * intended to use only with local images.
 * https://nextjs.org/docs/app/building-your-application/optimizing/images
 *
 * Props (also includes NextImage props):
 * - title: image title, which goes above the image;
 * - caption: image caption, which goes below the image;
 * - priority: should be set to true for the Largest Contentful Paint element;
 * 
 * Example:
 *
 * import testImg from '@/public/img/test.jpg';
 * <Image src={testImg} alt='A pretty image' title='Look my amazing picture!' caption='Bro, that is wonderful' />
 */
function Image({
  title,
  caption,
  placeholder="blur",   // Loads a blur version of the image
  ...props
}: Props) {
  return (
  <Block>
    {title && <div className="py-4 has-text-centered is-size-4">{title}</div>}
    <NextImage
      placeholder={placeholder}
      {...props}
    />
    {caption && <div className="py-2 has-text-centered has-text-weight-light">{caption}</div>}
  </Block>)
}

export default Image;
