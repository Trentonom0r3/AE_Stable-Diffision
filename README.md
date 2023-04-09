# AE_Stable-Diffision
The beginnings of a full after effects plugin that integrates Auto1111 Stable diffusion. Useable as a scriptUI for now.
This Project contains several folders. It is best to keep things together, but where you keep it on your system does not matter.
This a very basic, 'proof of concept' for a future extension for AE. Truthfully, I don't know much about coding, and most of this was written with the help of GPT4.
That being said, lets get into a basic how-to, and functionality.

Currently, I'm using python 3.10, and running this hash of Auto1111;
Commit hash: a9eab236d7e8afa4d6205127904a385b2c43bb24
After Effects 23.1.0
Make sure you are running your webuser-ui.bat file and the local server is up.

Also, make sure you have --api enabled.

Functionality-
This creates a scriptUI panel for Adobe After Effects that provides basic parameters for Auto1111 stable diffusion image generation.
Currently, the 'method' and 'process' dropdowns are unusable, but do not affect functionality. 
You will recognize the parameters used in the UI, so I won't go into detail on those.

![Screenshot 2023-04-09 114314](https://user-images.githubusercontent.com/130304830/230786162-93daa3d3-f74b-42cc-9039-43fd592c8515.png)

At the bottom of the UI, there are several buttons, most of which are self explanatory. 
Txt2Img generates txt2img, img2img generates img2img.
'Get Mask' Creates a 512x512px solid that the user can move to wherever they'd like. I move it to where I've rotoscoped, as thats what I use my Img2Img for. 
After moving the solid to the proper position over your mask (rotoscopes work best for this, masks leave a white image in img2img and dont blend as well)
Click the 'Confirm?' button. This will link the layers, center the comp, and export your input and inpaint images.
Next, mess around with your parameters, and then hit img2img. This will send the input and inpaint images to be generated using your prompts and parameters. 
I've found it to be difficult with some things, great on others-- just make sure you use a rotoscope on your clip before using the script. 

![Screenshot 2023-04-09 114340](https://user-images.githubusercontent.com/130304830/230786301-a53dd6c4-6f15-4357-aa2a-94c73588e9c7.png)


![Screenshot 2023-04-09 114836](https://user-images.githubusercontent.com/130304830/230786336-bec202ac-71e4-4c68-bb5c-9e93e9a52e6b.png)

Once that has finished, you can click 'Impose.' This will have you select the output (it will be in the outputs folder), and it will import it into the same position as the solid layer before centering and cropping.
  NOTE- Impose is being kind of wonky, I need to mess with it some more as it isn't properly adding the layer to the same position, but it does add the layer to the comp for you still.
'Clear cache and render queue' - This is self explanatory, though it doesn't clear the cache currently. 


Couple of things!
If you notice the script freeze up, or buttons not working, there are a few things I've done to help this out.
1. Clear your cache manually.
2. Close and restart the webUI.
3. Close and restart after effects. Its best to start from a clean file each time, so save a clean copy before adding any of the masks if you want to be able to go back to it.

Sometimes I have to do all 3, sometimes I only have to do one of those. But typically those will fix the issue. 
Keep in mind as I mentioned earlier, literally all of this code was written by GPT4. I really don't understand all of it, but I will be continuing to learn and develop this, making it more optimized and have extra functionality.
If you have any questions, feel free to ask and I will do my best to answer them!
