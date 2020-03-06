// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - First Edge Object
// 2019, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//

var _v = [], _e = [];   // globals used by standard graph reader method


// -----------------------------------------------------------------------
// global caller function, a main() for the caller page
// only function allowed to access global vars

function _main()
{
   // create a graph (default undirected)
   // graph


     var g = new Graph(); 

   // set input graph properties (label, directed etc.)

     g.label = 'Figure 3.10 (Levitin, 3rd edition)';

   // use global input arrays _v and _e to initialize its internal data structures

      g.read_graph(_v, _e);

   // use print_graph() method to check graph
  
      g.print_graph();


   // report connectivity status if available

      var connect = g.connectedComp;
      if (connect == 0)
        {
	   document.write("<p>no connectivity info </p>");
        } 
     else 
        {
	document.write("<p>DISCONNECTED ", connect, "</p>");
         } 

   // perform depth-first search and output stored result

          g.topoSearch();
          g.Counter++;
          document.write("<p>dfs_push: ", g.dfs_push, "</p>");

   // report connectivity status if available
        
         var connect = g.connectedComp;
         if (connect == 0) 
           {
       	      document.write("<p>no connectivity info </p>");
           }
         else
           {
	      document.write("<p>DISCONNECTED ", connect, "</p>");
           }

   // perform breadth-first search and output stored result

          g.topoSearch();
          document.write("<p>bfs_out: ", g.bfs_out, "</p>");

  // output the graph adjacency matrix

          g.makeAdjMatrix();
          document.write("<p>first row matrix: ", g.adjMatrix[0], "</p>");
          document.write("<p>last row matrix: ", g.adjMatrix[g.nv - 1], "</p>");

   


}


// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v)
{
   // user input fields

   this.label = v.label;          // vertex can be labelled

   // more fields to initialize internally

   this.visit = false;            // vertex can be marked visited or "seen"
   this.adjacent = new List();    // init an adjacency list

   // --------------------
   // member methods use functions defined below

                                 // return target id of incident edges in array

}

// -----------------------------------------------------------------------
// Edge object constructor

   function Edge() 
   {
     this.target_v;
     this.weight;
   }

// -----------------------------------------------------------------------
// Graph object constructor

function Graph()
{
   this.vert = new Array();                // vertex list (an array of Vertex objects)
   this.nv;                       // number of vertices
   this.ne;                       // number of edges
   this.digraph = false;          // true if digraph, false otherwise (default undirected)
   this.dfs_push = [];            // DFS order output
   this.bfs_out = [];             // BFS order output
   this.label = "";               // identification string to label graph
    this.connectedComp = 0;
       this.adjMatrix = [];  
   // --------------------
   // student property fields next

      this.nc = 0;
      this.adjMatrix = [];   
      this.weighted = false;                     // number of connected comps set by DFS; 0 (default) for no info
                                    // graph adjacency matrix to be created on demand


   // --------------------
   // member methods use functions defined below

   this.read_graph = better_input;   // default input reader method
   this.print_graph = print_graph; // better printer function
   this.list_vert = list_vert;

   this.add_edge = add_edge;        // replace (don't change old .add_edge)
   this.dfs = dfs;                  // DFS a connected component
   this.bfs = bfs;                  // BFS a connected component

   // --------------------
   // student methods next; implementing functions in student code section at end
  
      this.makeAdjMatrix = makeAdjMatrix;
      this.topoSearch = topoSearch; 
                                    // perform a topological search

       this.Counter = 1;
       this.dfs = dfs;
       this.bfs = bfs;
}


// -------------------------------------------------------
// Functions used by methods of Graph object. Similar to
// normal functions but use object member fields and
// methods, depending on which object is passed by the
// method call through the self variable: this.
//

// --------------------
function list_vert()
{
   var i, v;  // local vars
   for (i=0; i < this.nv; i++)
   {
      v = this.vert[i];
      document.write( "VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit,
         " - ADJACENCY: ", v.adjacentByID(), "<br>" );
   }
}

// --------------------
function better_input(v,e)
{
    this.nv = v.length;
    this.ne = e.length;

     for (var i = 0; i < this.nv; i++)
        {
	   this.vert[i] = new Vertex(v[i]);
	}

     for (var j = 0; j < this.ne; j++) 
        {
		this.add_edge2(e[j].u, e[j].v, e[j].w);
	 }

      if (!this.digraph) {
		this.ne = e.length * 2;
	}


}

// --------------------
function better_output()
{
   document.write("<p>GRAPH {",this.label, "} ", this.digraph?"":"UN", "DIRECTED - ", this.nv, " VERTICES, ",
      this.ne, " EDGES:</p>");

   // list vertices
   this.list_vert();
}

// --------------------
function add_edge(u_i,v_i)   // obsolete, replaced by add_edge2() below
{
     var uid = this.vert[u_i];
     var vid = this.vert[v_i];
   
     uid.adjacent.insert(v_i);

     if (!this.digraph)
	{
		vid.adjacent.insert(u_i);
	}
}

// --------------------
function dfs(v_i)
{
     var w, i;

     v = this.vert[v_i];
     v.visit = true;
     this.dfs_push[this.dfs_push.length] = v_i;


     w = v.adjacentByID();
	for (i = 0; i < w.length; i++) 
	{
	   if (!this.vert[w[i]].visit) 
	     {
		this.dfs(w[i]);
              }
	}
}

// --------------------
function bfs(v_i)
{
    var v = this.vert[v_i];


    v.visit = true;
    this.bfs_out[this.bfs_out.length] = v_i;


    var queue = new Queue();
    queue.enqueue(v);

    while (!queue.isEmpty()) 
    { 
        var u = queue.dequeue();

	var w = u.adjacentByID();

	for (var i = 0; i < w.length; i++) 
	{
		if (!this.vert[w[i]].visit) 
		{
		    this.vert[w[i]].visit = true;
		    queue.enqueue(this.vert[w[i]]);
		    this.bfs_out[this.bfs_out.length] = w[i];
		}
	}
      }  
}


// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------

function adjacentByID()
{
     var adjacent_ID = [];
     var edge_adj = this.adjacent.traverse();
	for (var i = 0; i < edge_adj.length; i++)
        {
            adjacent_ID[i] = edge_adj[i].target_v;
	}
   return adjacent_ID;

}

// --------------------
function add_edge2(u_i,v_i)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
   var u = this.vert[u_i];
   var v = this.vert[v_i];


   // insert (u,v), i.e., insert v in adjacency list of u
   // (first create edge object using v_i as target, then pass object)

    var edge = new Edge();
    edge.target_v = v_i;

   // insert (v,u) if undirected graph (repeat above but reverse vertex order)

     if (!this.digraph)
	{
		edge = new Edge();
		edge.target_v = u_i;
		if (!(w == undefined)) 
		{
			edge.weight = w;
		}
		v.adjacent.insert(edge);
	}

}

// --------------------
function topoSearch()
{
var i;

	for (i = 0; i < this.nv; i++) 
	{
		this.vert[i].visit = false;
	}

	
	for (i = 0; i < this.nv; i++) 
	{
		if (!this.vert[i].visit) 
		{
			this.Counter == 1 ?
				(this.connectedComp++, this.dfs(i)) : this.bfs(i);
		}
	}

}

// --------------------
function makeAdjMatrix()
{
   // initially create row elements and zero the adjacency matrix



   // for each vertex, set 1 for each adjacency

    for (var i = 0; i < this.nv; i++) 
	{
	this.adjMatrix[i] = [];
	for (var j = 0; j < this.nv; j++) 
	{
		this.adjMatrix[i][j] = 0;
	}
	var v = this.vert[i];
	var w = v.adjacentByID();

	var weight = v.adjacent.traverse();
	for (var k = 0; k < w.length; k++) 
	{
             if (!this.weighted) 
		{
			this.adjMatrix[i][w[k]] = 1;
		}
             else 
		{
			this.adjMatrix[i][w[k]] = weight[k].weight;
		}
	}
  }
}

}
