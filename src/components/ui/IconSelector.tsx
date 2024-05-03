import VirtualizedListbox from '@/components/ui/iconSelector/VirtualizedListbox'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Autocomplete, FormControl, ListItem, ListItemIcon, ListItemText, Popper, TextField, autocompleteClasses, styled } from '@mui/material'
import { FC, useMemo } from 'react'

export interface IconSelectorProps {
  value: string
  onChange: (value: string) => void
  label: string
}

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0
    }
  }
})

const IconSelector:FC<IconSelectorProps> = ({ value, onChange, label }) => {
  const icons = useMemo(() => {
    const icons = [
      ...Object.entries(fas).map(([label, icon]) => ({ family: 'fas', label: `fas ${label}`, icon })),
      ...Object.entries(fab).map(([label, icon]) => ({ family: 'fab', label: `fab ${label}`, icon }))
    ]
    return icons
  }, [])

  return (
    <FormControl
      fullWidth
    >
      <Autocomplete
        disableListWrap
        PopperComponent={StyledPopper}
        ListboxComponent={VirtualizedListbox}
        options={icons}
        renderOption={(props, option, state) => (
          <ListItem
            {...props}
            sx={{
              height: '48px'
            }}
            key={`option-${state.index}-${option.label}`}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={option.icon} />
            </ListItemIcon>
            <ListItemText primary={option.label} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
          </ListItem>
        )}
        value={icons.find((icon) => icon.label === value) || null}
        onChange={(e, value) => onChange(value?.label || '')}
        renderInput={(params) => <TextField {...params} label={label} />}
        fullWidth
      />
    </FormControl>
  )
}

export default IconSelector
