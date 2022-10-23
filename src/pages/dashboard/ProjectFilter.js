import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const filterList = ['all', 'mine', 'development', 'design', 'copyright']

export default function ProjectFilter({ currentFilter, changeFilter }) {
    const handleClick = (newFilter) => {
        changeFilter(newFilter);
    }

    return(
        <div className="project_filter">
            <Stack spacing={1} direction="row">
                {filterList.map((f) => (
                    <Button variant={currentFilter === f ? 'contained' : 'text'} key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                    >
                        {f}
                    </Button>
                ))}
            </Stack>
        </div>
    )
}