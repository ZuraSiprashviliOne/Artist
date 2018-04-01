<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$servername = "localhost";
$username = "id4523590_damon";
$password = "Abcd#$%h";
$dbname = "id4523590_damon";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$sSQL= 'SET CHARACTER SET utf8';
mysqli_query($conn, $sSQL);

function output($data, array $gets = null): void {
  if(isset($gets['item'])){
    $data = (array)$data;
    echo json_encode($data[$gets['item']]);
  }else{
    echo json_encode($data);
  }
}

function like_gallery($id){
  $response = ['result' => null];
  $sql = "INSERT INTO gallery_likes (item_id, ip) VALUES (". $id .', \''.$_SERVER['REMOTE_ADDR'].'\')';
  if($GLOBALS['conn']->query($sql)){
    $response['result'] = true;
  }else{
    $response['result'] = false;
  }
  return $response;
}

if(isset($_GET['locale'])){
  switch($_GET['locale']){
    case 'languages': {
      $path = './locale/languages.json';
      $languages = null;
      if(file_exists($path)){
        $file = fopen($path, 'r');
        $languages = json_decode(fread($file, filesize($path)));
        fclose($file);
      }
      echo json_encode($languages->content);
      break;
    }
    case 'keywords': {
      $sql = "select * from keywords";
      $result = $conn->query($sql);
      $languages = '';
      if(file_exists('./locale/languages.json')){
        $file = fopen('./locale/languages.json', 'r');
        $languages = json_decode(fread($file, filesize('./locale/languages.json')));
        fclose($file);
      }
      $data = [];
      foreach ($languages->content as $language) {
        $data[$language] = [];
      }
      while($row = $result->fetch_assoc()){
        foreach ($languages->content as $language) {
          array_push($data[$language], $row[$language]);
        }
      }
      if(!isset($_GET['reference']) && !isset($_GET['result'])){
        echo json_encode($data);
      }else if(isset($_GET['result'])){
        echo json_encode($data[$_GET['result']]);
      }else{
        echo json_encode($data[$_GET['reference']]);
      }
      break;
    }
    case 'reference': {
      $path = './locale/reference.json';
      $reference = null;
      if(file_exists($path)){
        $file = fopen($path, 'r');
        $reference = json_decode(fread($file, filesize($path)));
        fclose($file);
      }
      echo json_encode($reference->content);
      break;
    }
    default: {
      break;
    }
  }
}else if(isset($_GET['navigation'])){
  switch($_GET['navigation']){
    case 'list': {
      $sql = "select * from navigation_list";
      $result = $conn->query($sql);
      $data = [];
      while($row = $result->fetch_assoc()){
        array_push($data, $row);
      }
      echo json_encode($data);
      break;
    }
    case 'nav': {
      $path = './navigation/nav.json';
      $nav = null;
      if(file_exists($path)){
        $file = fopen($path, 'r');
        $nav = json_decode(fread($file, filesize($path)));
        fclose($file);
      }
      output($nav->content, $_GET);
      break;
    }
    default: {
      break;
    }
  }
}else if(isset($_GET['particles'])){
  $path = './particles.json';
  $particles = null;
  if(file_exists($path)){
    $file = fopen($path, 'r');
    $particles = json_decode(fread($file, filesize($path)));
    fclose($file);
  }
  output($particles->content, $_GET);
}else if(isset($_GET['home'])){
  switch($_GET['home']){
    case 'header': {
      $path = './home/header.json';
      $header = null;
      if(file_exists($path)){
        $file = fopen($path, 'r');
        $header = json_decode(fread($file, filesize($path)));
        fclose($file);
      }
      output($header->content, $_GET);
      break;
    }
    default: {
      break;
    }
  }
}else if(isset($_GET['gallery'])){
  switch($_GET['gallery']){
    case 'gallery': {
      $path = './gallery/gallery.json';
      $gallery = null;
      if(file_exists($path)){
        $file = fopen($path, 'r');
        $gallery = json_decode(fread($file, filesize($path)));
        fclose($file);
      }
      output($gallery->content, $_GET);
      break;
    }
    case 'categories': {
      $sql = "select * from gallery_categories";
      $result = $conn->query($sql);
      $data = [];
      while($row = $result->fetch_assoc()){
        array_push($data, $row);
      }
      echo json_encode($data); 
      break;
    }    
    case 'items': {
      $sql = "select * from gallery_items";
      $result = $conn->query($sql);
      $data = [];
      $items = [];
      while($row = $result->fetch_assoc()){
        array_push($items, $row);
      }

      $sql = "select * from gallery_items_to_categories";
      $result = $conn->query($sql);
      $itemCategories = [];
      while($row = $result->fetch_assoc()){
        array_push($itemCategories, $row);
      }

      $sql = "select * from gallery_categories";
      $result = $conn->query($sql);
      $categories = [];
      while($row = $result->fetch_assoc()){
        array_push($categories, $row);
      }

      $sql = "select * from gallery_likes";
      $result = $conn->query($sql);
      $likes = [];
      while($row = $result->fetch_assoc()){
        array_push($likes, $row);
      }

      $sql = "select * from gallery_comments";
      $result = $conn->query($sql);
      $comments = [];
      while($row = $result->fetch_assoc()){
        array_push($comments, $row);
      }

      $sql = "select * from gallery_seens";
      $result = $conn->query($sql);
      $seens = [];
      while($row = $result->fetch_assoc()){
        array_push($seens, $row);
      }

      foreach($items as &$item){
        $item['categories'] = [];
        $item['comments'] = 0;
        $item['likes'] = 0;
        $item['liked'] = false;
        $item['seen'] = false;
        $item['seens'] = 0;
        
        foreach($likes as $like){
          if($item['id'] == $like['item_id']){
            $item['likes']++;
            
            if($like['ip'] == $_SERVER['REMOTE_ADDR']){
              $item['liked'] = true;
            }
          }
        }

        foreach($comments as $comment){
          if($comment['item_id'] == $item['id']){
            $item['comments']++;
          }
        }

        foreach($seens as $seen){
          if($item['id'] == $seen['item_id']){
            $item['seens']++;
            
            if($seen['ip'] == $_SERVER['REMOTE_ADDR']){
              $item['seen'] = true;
            }
          }
        }

        
        foreach($itemCategories as $itemCategory){
          if($itemCategory['item_id'] == $item['id']){
            foreach($categories as $category){
              if($category['id'] == $itemCategory['category_id']){
                array_push($item['categories'], array_merge($itemCategory, $category));
              }
            }
          }
        }
        if(isset($_GET['category']) && $_GET['category'] != 'all'){
          foreach($item['categories'] as $category){
            if($category['slag'] == $_GET['category']){
              array_push($data, $item);
              break;
            }
          }
        }else{
          array_push($data, $item);
        }
      }

      echo json_encode($data);
      break;
    }
    case 'item': {
      if(isset($_GET['item_data'])){
        $path = './item/item.json';
        $item = null;
        if(file_exists($path)){
          $file = fopen($path, 'r');
          $item = json_decode(fread($file, filesize($path)));
          fclose($file);
        }
        echo json_encode($item->content);
      }
      if(isset($_GET['item'])){
        $sql = "select * from gallery_items where id = ".$_GET['item'];
        $result = $conn->query($sql);
        $data = [];
        $items = [];
        while($row = $result->fetch_assoc()){
          array_push($items, $row);
        }

        $sql = "select * from gallery_items_to_categories";
        $result = $conn->query($sql);
        $itemCategories = [];
        while($row = $result->fetch_assoc()){
          array_push($itemCategories, $row);
        }

        $sql = "select * from gallery_categories";
        $result = $conn->query($sql);
        $categories = [];
        while($row = $result->fetch_assoc()){
          array_push($categories, $row);
        }

        $sql = "select * from gallery_likes";
        $result = $conn->query($sql);
        $likes = [];
        while($row = $result->fetch_assoc()){
          array_push($likes, $row);
        }

        $sql = "select * from gallery_comments";
        $result = $conn->query($sql);
        $comments = [];
        while($row = $result->fetch_assoc()){
          array_push($comments, $row);
        }

        $sql = "select * from gallery_seens";
        $result = $conn->query($sql);
        $seens = [];
        while($row = $result->fetch_assoc()){
          array_push($seens, $row);
        }

        foreach($items as &$item){
          $item['categories'] = [];
          $item['comments'] = 0;
          $item['comms'] = [];
          $item['likes'] = 0;
          $item['liked'] = false;
          $item['seen'] = false;
          $item['seens'] = 0;
          $item['images'] = []; // !!!!! no images
          
          foreach($likes as $like){
            if($item['id'] == $like['item_id']){
              $item['likes']++;
              
              if($like['ip'] == $_SERVER['REMOTE_ADDR']){
                $item['liked'] = true;
              }
            }
          }

          foreach($comments as $comment){
            if($comment['item_id'] == $item['id']){
              $item['comments']++;
              array_push($item['comms'], $comment);
            }
          }

          foreach($seens as $seen){
            if($item['id'] == $seen['item_id']){
              $item['seens']++;
              
              if($seen['ip'] == $_SERVER['REMOTE_ADDR']){
                $item['seen'] = true;
              }
            }
          }
          
          foreach($itemCategories as $itemCategory){
            if($itemCategory['item_id'] == $item['id']){
              foreach($categories as $category){
                if($category['id'] == $itemCategory['category_id']){
                  array_push($item['categories'], array_merge($itemCategory, $category));
                }
              }
            }
          }

          array_push($data, $item);
        }

        echo json_encode($data[0]);
        break;

        
      }else if(isset($_GET['comments'])){
        $sql = "select * from gallery_comments where item_id = ".$_GET['comments'];
        $result = $conn->query($sql);
        $data = [];
        while($row = $result->fetch_assoc()){
          array_push($data, $row);
        }

        echo json_encode($data);
      }else if(isset($_GET['images'])){
        $sql = "select * from gallery_items_images WHERE item_id = ".$_GET['images'];
        $data = [];
        $result = $conn->query($sql);
        while($row = $result->fetch_assoc()){
          array_push($data, $row);
        }

        echo json_encode($data);
      }else if(isset($_GET['add_comment']) && isset($_GET['author']) && isset($_GET['message'])){
        $id = $_GET['add_comment'];
        $author = $_GET['author'];
        $message = $_GET['message'];

        if(empty($author) || empty($message)){
          echo json_encode(false);
        }else{
          $sql = "insert into gallery_comments (item_id, nickname, message) VALUES($id, '$author', '$message')";
          $conn->query($sql);
          $sql = "select * from gallery_comments where item_id=$id and message = '$message' and nickname = '$author'";
          $result = $conn->query($sql);
          $data;
          while($row = $result->fetch_assoc()){
            $data = $row;
            break;
          }
          echo json_encode($data);
        }
      }
      break;
    }

    default: {
      break;
    }
  }
}else if(isset($_GET['about'])){
  switch($_GET['about']){
    case 'about': {
      $path = './about/about.json';
      $about = null;
      if(file_exists($path)){
        $file = fopen($path, 'r');
        $about = json_decode(fread($file, filesize($path)));
        fclose($file);
      }
      output($about->content, $_GET);
      break;
    }
    default: {

      break;
    }
  }
}else if(isset($_GET['seen_gallery_item'])){
  $sql = 'Select * from gallery_seens where item_id = '.$_GET['seen_gallery_item'];
  $result = $conn->query($sql);
  $data = [];
  $valid = true;
  while($row = $result->fetch_assoc()){
    array_push($data, $row);
  }
  foreach($data as $dat){
    if($dat['ip'] == $_SERVER['REMOTE_ADDR']){
      $valid = false;
      break;
    }
  }
  if($valid){
    $sql = "INSERT INTO gallery_seens (item_id, ip) VALUES (". $_GET['seen_gallery_item'] .', \''.$_SERVER['REMOTE_ADDR'].'\')';
    $conn->query($sql);
  }
  echo json_encode($valid);

}else if(isset($_GET['like_gallery_item'])){
  $sql = 'select * from gallery_likes WHERE ip = \''.$_SERVER['REMOTE_ADDR'].'\'';
  $result = $conn->query($sql);
  $data = [];
  while($row = $result->fetch_assoc()){
    array_push($data, $row);
  }

  $ok = true;
    if(count($data) > 0){
      foreach($data as $like){
        if($like['item_id'] == $_GET['like_gallery_item']){
          $ok = false;
          break;
        }
      }
    }
    if($ok){
      echo json_encode(like_gallery($_GET['like_gallery_item']));
    }else{
      echo json_encode(['result' => false]);
    }
}

$conn->close();