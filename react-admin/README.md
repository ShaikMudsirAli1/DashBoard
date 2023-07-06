id: 2,
name: "Shaik Mudsir Ali",
email: "SMA@gmail.com",
age: 45,
phone: "88889999",
access: "Manager",
},

{ # REACT HOOK FORM MORE SUITABLE WITH TAILWIND JS }

import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import \* as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

/\*\*

-
- @returns PROFILE FORM WITH FROMIK AND YUP.
  \*/

// initialValues Object.
const initialValues = {
firstName: "",
lastName: "",
email: "",
contact: "",
address1: "",
address2: "",
};

// CONTACT VALIDATION
const phoneRegExp =
/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)\*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// VALIDATION OF EVERY FIELD USING YUP LIBRARY.
const userSchema = yup.object().shape({
firstName: yup.string().required("required"),
lastName: yup.string().required("required"),
email: yup.string().email("invalid email").required("required"),

// CONTACT: I HAVE TWO TYPES OF VALIDATION ONE HIS MATCHES AND REQUIRED.
contact: yup
.string()
.matches(phoneRegExp, "Phone number is not valid")
.required("required"),
address1: yup.string().required("required"),
address2: yup.string().required("required"),
});

const Form = () => {
// useMediaQuery FOR LAYOUT RESPONSIVE.
const isNonMobile = useMediaQuery("(min-width:600px)");

// handleFormSubmit function
const handleSubmit = (values) => {
console.log(values);
};

return (
<Box m="20px">

<Header title="CREATE USER" subTitle="Create A New User Profile" />
{/_ FORMIK LIBRARY _/}
<Formik
onSubmit={handleSubmit}
initialValues={initialValues}
// VALIDATION SCHEMA
validationSchema={userSchema} >
{/_ FORMIK COMPONENT PROVIDES LOTS OF PREDEFINED VALUES. _/}
{({
values,
errors,
touched,
handleBlur,
handleChange,
handleSumbit,
}) => (
<form onSubmit={handleSumbit}>
<Box
display="grid"
gap="30px"
gridTemplateColumns="repeat(4,minmax(0,1fr)"
sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }} >
{/_ FIRSTNAME FIELD _/}
<TextField
fullWidth
variant="filled"
type="text"
label="First Name"
onBlur={handleBlur}
onChange={handleChange}
value={values.firstName}
name="firstName"
error={!!touched.firstName && !!errors.firstName}
helperText={touched.firstName && errors.firstName}
sx={{ gridColumn: " span 2" }}
/>
{/_ lASTNAME FIELD _/}

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              {/* EMAILFIELD */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              {/* CONTACT FIELD */}

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              {/* ADDRESS FIELD */}

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              {/*ADDRESS2 FIELD */}

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create a New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>

);
};

export default Form;

import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
Box,
List,
ListItem,
ListItemText,
Typography,
useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

// CALENDAR USING FULL CALENDAR PACKAGE .
// CALENDAR COMPONENT
const Calendar = () => {
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const [currentEvents, setCurrentEvents] = useState([]);

// handleDateClick function.
const handleDateClick = (selected) => {
// console.log(selected);
const title = prompt("Please enter an new title for your event");
const calendarApi = selected.view.calendar;

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr} - ${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }

};

// THIS FUNCTION WILL BE TRIGGERED WHEN THE FUNCTION IS WHEN U CLICK
// ON THE EVENT.

const handleEventClick = (selected) => {
if (
window.confirm(
`Are you sure you want to delete the event "${selected.event.title}"`
)
) {
selected.event.remove();
}
};

return (
<Box m="20px">

<Header title="CALENDAR" subTitle="Full Calendar Interactive Page" />
<Box display="flex" justifyContent="space-between">
{/_ CALENDAR SIDEBAR LEFTSIDE _/}
{/_ FLEX= ROW, SHRINK, WIDTH= PRECNETAGE OF THE PLACE _/}
<Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="5px"
        >
<Typography variant="h5">Events</Typography>
<List>
{currentEvents.map((event) => (
<ListItem
Key={event.id}
sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }} >
<ListItemText
primary={event.title}
secondary={
<Typography>
{
(formatDate(event.start),
{
year: "numeric",
month: "short",
day: "numeric",
})
}
</Typography>
}
/>
</ListItem>
))}
</List>
</Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          {/* The <FullCalendar> component is equipped with all of FullCalendar’s options! Just pass them in as props. Example: */}
          <FullCalendar
            height="75vh"
            // CALENDAR IS ADDED WITH PLUGINS.
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev, next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
             {
                id: "12315",
                title: "All-day event",
                date: "2023-07-05",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-07-05",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>

);
};

export default Calendar;

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
