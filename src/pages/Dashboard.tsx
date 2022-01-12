import Layout from "../components/Layout/Layout"
import {searchPosts,getPagePosts} from "../store/slices/posts.slice"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Stack from "@mui/material/Stack"
import Pagination from "@mui/material/Pagination"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import Box from "@mui/material/Box"
import {useTheSelector, useTheDispatch} from "../store/index"
import {Navigate} from "react-router-dom";
import {memo, FC,useEffect,useState,FormEvent } from "react";
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import {getPosts} from "../store/slices/posts.slice";
import ThePostsTable from "../components/App/ThePostsTable"

interface Props {
  access_token: string
}
const fields = [
  "Title",
  "Content",
]

const Dashboard: FC<Props> = ({access_token}) => {
  const data = useTheSelector(state => state.posts)
  const dispatch = useTheDispatch();
  const [searchText,setSearchText] = useState<string>("");
  const [selectedField,setSelectedField] = useState<string>("title");

  useEffect(() => {
    if(access_token) {
      dispatch(getPosts({token:access_token}));
    } 
  },[])
  if(!access_token){ 
    return <Navigate to="/auth/login" replace />
  }
  const search = (e:FormEvent) => {
    e.preventDefault();
    dispatch(searchPosts({
      token:access_token,
      searchText,
      searchField: selectedField,
    }))
  }

  return (
    <Layout title="Dashboard | Wsafar">
      <Box
        sx={{
          margin: "50px auto",
          boxShadow: 4,
          backgroundColor: "white",
          padding: "20px 0",
        }}
      >
        <Container>
          <Divider sx={{ margin: "30px" }}>
            <Typography variant="h5" component="h1">
              Posts
            </Typography>
          </Divider>
          <FormControl
            sx={{ marginBottom: 4 }}
            fullWidth
            onSubmit={search}
            component="form"
          >
            <Stack direction="row" spacing={2}>
              <Box sx={{ flexGrow: 1 }}>
                <InputLabel id="select-field">Field</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="select-field"
                  label="Field"
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                >
                  {fields.map((f, i) => (
                    <MenuItem key={i} value={f.toLowerCase()}>
                      {f}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <TextField
                label="Search"
                sx={{ flexGrow: 1 }}
                variant="outlined"
                onChange={(e) => setSearchText(e.currentTarget.value)}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ color: "white", backgroundColor: "#932E49" }}
              >
                Search
              </Button>
            </Stack>
          </FormControl>
          <ThePostsTable data={data.posts} />
          <Pagination
            
            sx={{margin:"20px auto", "& > ul":{justifyContent:"center"}}}
            onChange={(e, v) =>
              dispatch(getPagePosts({ page: v, token: access_token }))
            }
            page={data.currentPage || 1}
            count={data.totalPages || 0}
          />
        </Container>
      </Box>
    </Layout>
  );
};

export default memo(Dashboard);
