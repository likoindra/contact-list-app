import useFetch from "react-fetch-hook";
import ContactCard from "./ContactCard";
import { useState, useEffect } from "react";

function App() {
  const url = "https://randomuser.me/api";
  const { isLoading, data, error } = useFetch(url + "?results=200");
  // data && console.log(data)
  const [contactList, setContactList] = useState(null);
  const [filterQuery, setFilterQuery] = useState(null);

  useEffect(() => {
    if (filterQuery) {
      const queryString = filterQuery.toLowerCase();
      const filteredData = data?.results?.filter((contact) => {
        const fullName = `${contact.name.first} ${contact.name.last}`;
        // if just 1 letter
        if (queryString.length === 1) {
          // get firstLetter from sting of fullName
          const firstLetter = fullName.charAt(0).toLowerCase();
          return firstLetter === queryString;
        }
        // if not equal to 1
        else {
          //  if search Angelina and in contains "nge" the result will come with Angelina
          return fullName.toLowerCase().includes(queryString);
        }
      });
      setContactList(filteredData);
    } else {
      setContactList(data?.results);
    }
  }, [data, filterQuery]);
  return (
    <div className="bg-gray-100">
      {/* This is the type input form  */}
      <section>
        <form action="">
          <input
            placeholder="type here to filter..."
            type="text"
            className="ml-20 mt-6 rounded-md p-2"
            // to make the search bar working 
            onChange={event => setFilterQuery(event.target.value)}
          />
        </form>
      </section>
      {/* make some grid for the contact list  */}
      <section className="p-20 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* if there's no results on your search  */}
        {contactList?.length < 1 && (
          <h1> No data mathces your search</h1>
        )}
        <ContactCard contactList={contactList} />
      </section>
    </div>
  );
}

export default App;
