const BlogsArea = getElement(".blogArticles") 
 


window.addEventListener('load',()=>{
    //fetch blog posts


    var urlParams = new URLSearchParams(window.location.search);
    var messValue = urlParams.get('mess');

    const result=fetch(`/blog/fetchBlog?mess=${messValue}`,{
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
        },
        })
    .then((res)=>{
        if (res.ok) {
          return res.json();  //Will return the data
        } else {
          throw new Error('fetching Blog posts failed');
        }
      })
    .then((data)=>{
        console.log(data)    
 
         // SET Blogs Headings  
        
        var authorProfilPic= data.blogAuthSet.author.profilPic;
        var authorFullName=  data.blogAuthSet.author.last_name + " " +  data.blogAuthSet.author.first_name 
        var authorStatus= data.blogAuthSet.author.status

        const date = new Date(data.blogAuthSet.blog.date);
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        };

        const formattedDate = date.toLocaleString('en-US', options);
        console.log(formattedDate);

        var blogRD = formattedDate
        var inOneWord = data.blogAuthSet.blog.oneWordTopic;

        var HTMLtemplate= `
         <div class="blogHeading"> 

            <div class="authorPP">
              <img src=./assets/${authorProfilPic}>
            </div>

            <div>
              <p>${authorFullName} (${authorStatus})-${blogRD} </p>
              <p class="InOneWord">${inOneWord}</p>
            </div>

         </div>
         `

         console.log(HTMLtemplate);
         const blogPostHeading  = document.createElement("div");
         blogPostHeading.setHTML(HTMLtemplate);
         BlogsArea.appendChild(blogPostHeading); 

         const blogPostElement = document.createElement("div");
        blogPostElement.setHTML(data.blogAuthSet.blog.content);
        BlogsArea.appendChild(blogPostElement); 
    
    }) 
    .catch((err)=>{
        console.error(err);
      })

});