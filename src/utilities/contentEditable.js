export const onInputPressEnter = e => {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.blur()
  }
}
export const selectAllInlineText = e => {
  e.target.focus()
  e.target.select()
}
