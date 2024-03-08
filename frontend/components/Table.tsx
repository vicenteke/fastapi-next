interface Props extends React.ComponentPropsWithoutRef<'table'> {
  header?: Array<React.ReactNode | string | null>
  footer?: Array<React.ReactNode | string | null>
  body?: Array<Array<React.ReactNode | string | null>>
  activeRow?: number
  idColumn?: number
  isBordered?: boolean
  isStriped?: boolean
  isNarrow?: boolean
  isHoverable?: boolean
  isFullwidth?: boolean
}

/* Description: Bulma table wrapper.
 *
 * Props (also includes NextImage props):
 * - header: array with the header elements;
 * - footer: array with the footer elements;
 * - body: array of arrays with the body elements;
 * - activeRow: index of the active row;
 * - idColumn: index of the ID column;
 * - isBordered: whether to make the table bordered or not;
 * - isStriped: whether to make the table striped or not;
 * - isNarrow: whether to make the table narrowed or not;
 * - isHoverable: whether to make the table hoverable or not;
 * - isFullwidth: whether to make the table full-width or not;
 */
function Table({
  className,
  header,
  footer,
  body,
  activeRow,
  idColumn,
  isBordered,
  isStriped,
  isNarrow,
  isHoverable,
  isFullwidth=true,
  ...props
}: Props) {
  // TODO
  let classNames = [className, 'table'];
  if (isBordered) classNames.push('is-bordered');
  if (isStriped) classNames.push('is-striped');
  if (isNarrow) classNames.push('is-narrow');
  if (isHoverable) classNames.push('is-hoverable');
  if (isFullwidth) classNames.push('is-fullwidth');

  return (
  <table className={classNames.join(' ')} {...props}>
    {header &&
      <thead>
        <tr>
          {header.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
    }
    {footer &&
      <tfoot>
        <tr>
          {footer.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </tfoot>
    }
    {body &&
      <tbody>
        {body.map((line, lineIndex) => {
          return (
            <tr
              key={lineIndex}
              className={activeRow && lineIndex === activeRow ? 'is-selected' : ''}
            >
              {line.map((item, index) => {
                if (idColumn && index === idColumn)
                  return <th key={index}>{item}</th>
                return <td key={index}>{item}</td>
              })}
          </tr>)
        })}
      </tbody>
    }
  </table>
  )
}

export default Table;
