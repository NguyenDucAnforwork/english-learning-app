### BaseModel vs Base
- BaseModel: used for authentication, serializer and data validation
- Base: To define database model
- For reference: main/register_user: schema -> return model.User -> convert back to schemas.User to give back to the client

### Class config in BaseModel
- if you have an SQLAlchemy model instance, you can convert it directly to a Pydantic model without needing to manually extract the attributes.

### Frontend vs Backend
- App is an instance of the FastAPI class, which indeed a backend object
- The URL you specify in @app.post(...) is part of your backend API. The frontend (e.g., a React or Next.js application) will make HTTP requests to this URL to send data (like user information) to the backend. For example, if your frontend application wants to create a new user, it will send a POST request to the backend URL (e.g., http://localhost:8000/users/).

### Register
- user info -> Basemodel -> get_email_by... (retrieve the db, if there exists such email => raise error) -> User (Base) object -> add to Db => input: schema, output: model

### Login
- authenticate -> create access token (based on the user's email)
- provide a mechanism for users to log in and receive a token for accessing protected resources in the application

### FastAPI
- The Depends() function in this code is used for dependency injection in FastAPI. It allows you to specify that certain parameters of the login function should be automatically provided by FastAPI.

### All the backend URLs: register, token, users/me, vocabulary/context

### Frontend 
- 'use client': to declare that this particular component will run on a browser instead of a server or accessing browser-specific APIs like localStorage
- .tsx file
+) const logout = () => { // logout the user, set the token and user to null
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  }; => logout is a FUNCTION
+) const [token, setToken] = useState<string | null>(null);
+) const { user } = useAuth(); but not const user = useAuth();? Cuz useAuth() returns multiple values
+) useEffect(() => {
    if (user) {
      router.push('/');
    }
}, [user, router]); (execute everytime user or router changes)
+) return ( // provide the user, token, setToken, logout to the AuthContext
    <AuthContext.Provider value={{ user, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  ); => Any component inside <AuthContext.Provider> can access the provided data by useContext(AuthContext)
+) Render a .tsx file into the UI (or return the HTML component)
- hooks:
+) useEffect: execute everytime the value of user or router changes
- CSS
+) className="text-indigo-600 hover:text-indigo-500" (before vs after move the mouse through the component)
- hooks
+) useState vs useEffect (save and update the click counts vs log or call API whenver the variable count changes)
+) useState: how to know which var is login, logout,... When user submit the username => onChange={(e) => setFullName(e.target.value)} => setFullName is activated => check the state

+) useAuth: custom hook that is used to retrieve value from AuthContext so that any component that uses useAuth could access user's info and relevant methods related to authentication
- export const: declare constant then export
+) ({ children }: { children: ReactNode }): extract children property from the object props => saying that object props has the type childrem: ReactNode
=> equivalent to this python code:
def my_component(props: dict):
    children = props["children"]


