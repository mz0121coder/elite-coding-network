function Index ({user, postsData, errorloading}) {
    const [ posts, setPosts] useState (postsData || []);
    const [showToastr, setShowToastr] = useState(false);
    const [hasMore, setHasMore] = useState (true);
}