import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  useNavigation,
  redirect,
  useSubmit,
  useParams,
  Link,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { getContacts, createContact } from "../contacts";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const contacts = await getContacts(q);
  // console.log("----loader----");
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();

  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const [query, setQuery] = useState(q);
  const navigation = useNavigation();
  const auth = useAuth();
  console.log(useParams());
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  // console.log("query", query);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>{/* other code */}</div>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className={searching ? "loading" : ""}
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">Newq</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>

        <div>
          <h1>Welcome! {auth.user?.username}</h1>
          <button onClick={() => auth.logOut()} className="btn-submit">
            logout
          </button>
        </div>

        <Link to="/ghj/fgnm">TO 404</Link>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
