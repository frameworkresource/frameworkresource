package com.android.androidappexp

import android.graphics.drawable.Drawable
import android.os.Handler
import android.os.Looper
import android.view.LayoutInflater
import android.view.ViewGroup
import android.view.animation.Animation
import android.view.animation.LinearInterpolator
import android.view.animation.RotateAnimation
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView.Adapter
import androidx.recyclerview.widget.RecyclerView.ViewHolder
import com.android.androidappexp.ImagesAdapter.ImageViewHolder
import com.android.androidappexp.databinding.ListItemBinding

class ImagesAdapter(
    private val list: List<Drawable>,
    private val onFinishAnimation: () -> Unit
    ) : Adapter<ImageViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ImageViewHolder {
        return ImageViewHolder(
            ListItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        )
    }

    override fun onBindViewHolder(holder: ImageViewHolder, position: Int) {
        holder.bind(list[position])
        if (position == list.lastIndex){
            onFinishAnimation()
        }
    }

    override fun getItemCount(): Int =
        list.size

    inner class ImageViewHolder(private val binding: ListItemBinding) : ViewHolder(binding.root) {
        fun bind(drawable: Drawable) {
            binding.image.setImageDrawable(drawable)
            Handler(Looper.getMainLooper()).postDelayed({
                binding.image.rotateImage()
            }, 2000)

        }
    }

    private fun ImageView.rotateImage(delay: Long = 18000) {
        val rotate = RotateAnimation(
            0f,
            3240f,
            Animation.RELATIVE_TO_SELF, 0.5f,
            Animation.RELATIVE_TO_SELF, 0.5f
        ).apply {
            duration = delay
            interpolator = LinearInterpolator()
        }
        this.startAnimation(rotate)
    }
}